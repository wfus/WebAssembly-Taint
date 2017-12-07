// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Parts of the implementation below:

// Copyright (c) 2014 the Dart project authors.  Please see the AUTHORS file [1]
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file [2].
//
// [1] https://github.com/dart-lang/sdk/blob/master/AUTHORS
// [2] https://github.com/dart-lang/sdk/blob/master/LICENSE

// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file [3].
//
// [3] https://golang.org/LICENSE

#include "src/objects/bigint.h"

#include "src/double.h"
#include "src/objects-inl.h"

namespace v8 {
namespace internal {

Handle<BigInt> BigInt::UnaryMinus(Handle<BigInt> x) {
  // Special case: There is no -0n.
  if (x->is_zero()) {
    return x;
  }
  Handle<BigInt> result = BigInt::Copy(x);
  result->set_sign(!x->sign());
  return result;
}

MaybeHandle<BigInt> BigInt::BitwiseNot(Handle<BigInt> x) {
  Handle<BigInt> result;
  int length = x->length();
  if (x->sign()) {
    // ~(-x) == ~(~(x-1)) == x-1
    result = AbsoluteSubOne(x, length);
  } else {
    // ~x == -x-1 == -(x+1)
    result = AbsoluteAddOne(x, true);
  }
  result->RightTrim();
  return result;
}

MaybeHandle<BigInt> BigInt::Exponentiate(Handle<BigInt> base,
                                         Handle<BigInt> exponent) {
  UNIMPLEMENTED();  // TODO(jkummerow): Implement.
}

Handle<BigInt> BigInt::Multiply(Handle<BigInt> x, Handle<BigInt> y) {
  if (x->is_zero()) return x;
  if (y->is_zero()) return y;
  Handle<BigInt> result =
      x->GetIsolate()->factory()->NewBigInt(x->length() + y->length());
  for (int i = 0; i < x->length(); i++) {
    MultiplyAccumulate(y, x->digit(i), result, i);
  }
  result->set_sign(x->sign() != y->sign());
  result->RightTrim();
  return result;
}

MaybeHandle<BigInt> BigInt::Divide(Handle<BigInt> x, Handle<BigInt> y) {
  // 1. If y is 0n, throw a RangeError exception.
  if (y->is_zero()) {
    THROW_NEW_ERROR(y->GetIsolate(),
                    NewRangeError(MessageTemplate::kBigIntDivZero), BigInt);
  }
  // 2. Let quotient be the mathematical value of x divided by y.
  // 3. Return a BigInt representing quotient rounded towards 0 to the next
  //    integral value.
  if (AbsoluteCompare(x, y) < 0) {
    // TODO(jkummerow): Consider caching a canonical zero-BigInt.
    return x->GetIsolate()->factory()->NewBigIntFromInt(0);
  }
  Handle<BigInt> quotient;
  if (y->length() == 1) {
    digit_t remainder;
    AbsoluteDivSmall(x, y->digit(0), &quotient, &remainder);
  } else {
    AbsoluteDivLarge(x, y, &quotient, nullptr);
  }
  quotient->set_sign(x->sign() != y->sign());
  quotient->RightTrim();
  return quotient;
}

MaybeHandle<BigInt> BigInt::Remainder(Handle<BigInt> x, Handle<BigInt> y) {
  // 1. If y is 0n, throw a RangeError exception.
  if (y->is_zero()) {
    THROW_NEW_ERROR(y->GetIsolate(),
                    NewRangeError(MessageTemplate::kBigIntDivZero), BigInt);
  }
  // 2. Return the BigInt representing x modulo y.
  // See https://github.com/tc39/proposal-bigint/issues/84 though.
  if (AbsoluteCompare(x, y) < 0) return x;
  Handle<BigInt> remainder;
  if (y->length() == 1) {
    digit_t remainder_digit;
    AbsoluteDivSmall(x, y->digit(0), nullptr, &remainder_digit);
    if (remainder_digit == 0) {
      return x->GetIsolate()->factory()->NewBigIntFromInt(0);
    }
    remainder = x->GetIsolate()->factory()->NewBigIntRaw(1);
    remainder->set_digit(0, remainder_digit);
  } else {
    AbsoluteDivLarge(x, y, nullptr, &remainder);
  }
  remainder->set_sign(x->sign());
  remainder->RightTrim();
  return remainder;
}

Handle<BigInt> BigInt::Add(Handle<BigInt> x, Handle<BigInt> y) {
  bool xsign = x->sign();
  if (xsign == y->sign()) {
    // x + y == x + y
    // -x + -y == -(x + y)
    return AbsoluteAdd(x, y, xsign);
  }
  // x + -y == x - y == -(y - x)
  // -x + y == y - x == -(x - y)
  if (AbsoluteCompare(x, y) >= 0) {
    return AbsoluteSub(x, y, xsign);
  }
  return AbsoluteSub(y, x, !xsign);
}

Handle<BigInt> BigInt::Subtract(Handle<BigInt> x, Handle<BigInt> y) {
  bool xsign = x->sign();
  if (xsign != y->sign()) {
    // x - (-y) == x + y
    // (-x) - y == -(x + y)
    return AbsoluteAdd(x, y, xsign);
  }
  // x - y == -(y - x)
  // (-x) - (-y) == y - x == -(x - y)
  if (AbsoluteCompare(x, y) >= 0) {
    return AbsoluteSub(x, y, xsign);
  }
  return AbsoluteSub(y, x, !xsign);
}

MaybeHandle<BigInt> BigInt::LeftShift(Handle<BigInt> x, Handle<BigInt> y) {
  if (y->is_zero() || x->is_zero()) return x;
  if (y->sign()) return RightShiftByAbsolute(x, y);
  return LeftShiftByAbsolute(x, y);
}

MaybeHandle<BigInt> BigInt::SignedRightShift(Handle<BigInt> x,
                                             Handle<BigInt> y) {
  if (y->is_zero() || x->is_zero()) return x;
  if (y->sign()) return LeftShiftByAbsolute(x, y);
  return RightShiftByAbsolute(x, y);
}

MaybeHandle<BigInt> BigInt::UnsignedRightShift(Handle<BigInt> x,
                                               Handle<BigInt> y) {
  THROW_NEW_ERROR(x->GetIsolate(), NewTypeError(MessageTemplate::kBigIntShr),
                  BigInt);
}

namespace {

// Produces comparison result for {left_negative} == sign(x) != sign(y).
ComparisonResult UnequalSign(bool left_negative) {
  return left_negative ? ComparisonResult::kLessThan
                       : ComparisonResult::kGreaterThan;
}

// Produces result for |x| > |y|, with {both_negative} == sign(x) == sign(y);
ComparisonResult AbsoluteGreater(bool both_negative) {
  return both_negative ? ComparisonResult::kLessThan
                       : ComparisonResult::kGreaterThan;
}

// Produces result for |x| < |y|, with {both_negative} == sign(x) == sign(y).
ComparisonResult AbsoluteLess(bool both_negative) {
  return both_negative ? ComparisonResult::kGreaterThan
                       : ComparisonResult::kLessThan;
}

}  // namespace

// (Never returns kUndefined.)
ComparisonResult BigInt::CompareToBigInt(Handle<BigInt> x, Handle<BigInt> y) {
  bool x_sign = x->sign();
  if (x_sign != y->sign()) return UnequalSign(x_sign);

  int result = AbsoluteCompare(x, y);
  if (result > 0) return AbsoluteGreater(x_sign);
  if (result < 0) return AbsoluteLess(x_sign);
  return ComparisonResult::kEqual;
}

bool BigInt::EqualToBigInt(BigInt* x, BigInt* y) {
  if (x->sign() != y->sign()) return false;
  if (x->length() != y->length()) return false;
  for (int i = 0; i < x->length(); i++) {
    if (x->digit(i) != y->digit(i)) return false;
  }
  return true;
}

Handle<BigInt> BigInt::BitwiseAnd(Handle<BigInt> x, Handle<BigInt> y) {
  Handle<BigInt> result;
  if (!x->sign() && !y->sign()) {
    result = AbsoluteAnd(x, y);
  } else if (x->sign() && y->sign()) {
    int result_length = Max(x->length(), y->length()) + 1;
    // (-x) & (-y) == ~(x-1) & ~(y-1) == ~((x-1) | (y-1))
    // == -(((x-1) | (y-1)) + 1)
    result = AbsoluteSubOne(x, result_length);
    result = AbsoluteOr(result, AbsoluteSubOne(y, y->length()), *result);
    result = AbsoluteAddOne(result, true, *result);
  } else {
    DCHECK(x->sign() != y->sign());
    // Assume that x is the positive BigInt.
    if (x->sign()) std::swap(x, y);
    // x & (-y) == x & ~(y-1) == x &~ (y-1)
    result = AbsoluteAndNot(x, AbsoluteSubOne(y, y->length()));
  }
  result->RightTrim();
  return result;
}

Handle<BigInt> BigInt::BitwiseXor(Handle<BigInt> x, Handle<BigInt> y) {
  Handle<BigInt> result;
  if (!x->sign() && !y->sign()) {
    result = AbsoluteXor(x, y);
  } else if (x->sign() && y->sign()) {
    int result_length = Max(x->length(), y->length());
    // (-x) ^ (-y) == ~(x-1) ^ ~(y-1) == (x-1) ^ (y-1)
    result = AbsoluteSubOne(x, result_length);
    result = AbsoluteXor(result, AbsoluteSubOne(y, y->length()), *result);
  } else {
    DCHECK(x->sign() != y->sign());
    int result_length = Max(x->length(), y->length()) + 1;
    // Assume that x is the positive BigInt.
    if (x->sign()) std::swap(x, y);
    // x ^ (-y) == x ^ ~(y-1) == ~(x ^ (y-1)) == -((x ^ (y-1)) + 1)
    result = AbsoluteSubOne(y, result_length);
    result = AbsoluteXor(result, x, *result);
    result = AbsoluteAddOne(result, true, *result);
  }
  result->RightTrim();
  return result;
}

Handle<BigInt> BigInt::BitwiseOr(Handle<BigInt> x, Handle<BigInt> y) {
  Handle<BigInt> result;
  int result_length = Max(x->length(), y->length());
  if (!x->sign() && !y->sign()) {
    result = AbsoluteOr(x, y);
  } else if (x->sign() && y->sign()) {
    // (-x) | (-y) == ~(x-1) | ~(y-1) == ~((x-1) & (y-1))
    // == -(((x-1) & (y-1)) + 1)
    result = AbsoluteSubOne(x, result_length);
    result = AbsoluteAnd(result, AbsoluteSubOne(y, y->length()), *result);
    result = AbsoluteAddOne(result, true, *result);
  } else {
    DCHECK(x->sign() != y->sign());
    // Assume that x is the positive BigInt.
    if (x->sign()) std::swap(x, y);
    // x | (-y) == x | ~(y-1) == ~((y-1) &~ x) == -(((y-1) &~ x) + 1)
    result = AbsoluteSubOne(y, result_length);
    result = AbsoluteAndNot(result, x, *result);
    result = AbsoluteAddOne(result, true, *result);
  }
  result->RightTrim();
  return result;
}

MaybeHandle<BigInt> BigInt::Increment(Handle<BigInt> x) {
  int length = x->length();
  Handle<BigInt> result;
  if (x->sign()) {
    result = AbsoluteSubOne(x, length);
    result->set_sign(true);
  } else {
    result = AbsoluteAddOne(x, false);
  }
  result->RightTrim();
  return result;
}

MaybeHandle<BigInt> BigInt::Decrement(Handle<BigInt> x) {
  int length = x->length();
  Handle<BigInt> result;
  if (x->sign()) {
    result = AbsoluteAddOne(x, true);
  } else if (x->is_zero()) {
    // TODO(jkummerow): Consider caching a canonical -1n BigInt.
    result = x->GetIsolate()->factory()->NewBigIntFromInt(-1);
  } else {
    result = AbsoluteSubOne(x, length);
  }
  result->RightTrim();
  return result;
}

bool BigInt::EqualToString(Handle<BigInt> x, Handle<String> y) {
  Isolate* isolate = x->GetIsolate();
  // a. Let n be StringToBigInt(y).
  MaybeHandle<BigInt> maybe_n = StringToBigInt(isolate, y);
  // b. If n is NaN, return false.
  Handle<BigInt> n;
  if (!maybe_n.ToHandle(&n)) {
    DCHECK(!isolate->has_pending_exception());
    return false;
  }
  // c. Return the result of x == n.
  return EqualToBigInt(*x, *n);
}

bool BigInt::EqualToNumber(Handle<BigInt> x, Handle<Object> y) {
  DCHECK(y->IsNumber());
  // a. If x or y are any of NaN, +∞, or -∞, return false.
  // b. If the mathematical value of x is equal to the mathematical value of y,
  //    return true, otherwise return false.
  if (y->IsSmi()) {
    int value = Smi::ToInt(*y);
    if (value == 0) return x->is_zero();
    // Any multi-digit BigInt is bigger than a Smi.
    STATIC_ASSERT(sizeof(digit_t) >= sizeof(value));
    return (x->length() == 1) && (x->sign() == (value < 0)) &&
           (x->digit(0) ==
            static_cast<digit_t>(std::abs(static_cast<int64_t>(value))));
  }
  DCHECK(y->IsHeapNumber());
  double value = Handle<HeapNumber>::cast(y)->value();
  return CompareToDouble(x, value) == ComparisonResult::kEqual;
}

ComparisonResult BigInt::CompareToNumber(Handle<BigInt> x, Handle<Object> y) {
  DCHECK(y->IsNumber());
  if (y->IsSmi()) {
    bool x_sign = x->sign();
    int y_value = Smi::ToInt(*y);
    bool y_sign = (y_value < 0);
    if (x_sign != y_sign) return UnequalSign(x_sign);

    if (x->is_zero()) {
      DCHECK(!y_sign);
      return y_value == 0 ? ComparisonResult::kEqual
                          : ComparisonResult::kLessThan;
    }
    // Any multi-digit BigInt is bigger than a Smi.
    STATIC_ASSERT(sizeof(digit_t) >= sizeof(y_value));
    if (x->length() > 1) return AbsoluteGreater(x_sign);

    digit_t abs_value = std::abs(static_cast<int64_t>(y_value));
    digit_t x_digit = x->digit(0);
    if (x_digit > abs_value) return AbsoluteGreater(x_sign);
    if (x_digit < abs_value) return AbsoluteLess(x_sign);
    return ComparisonResult::kEqual;
  }
  DCHECK(y->IsHeapNumber());
  double value = Handle<HeapNumber>::cast(y)->value();
  return CompareToDouble(x, value);
}

ComparisonResult BigInt::CompareToDouble(Handle<BigInt> x, double y) {
  if (std::isnan(y)) return ComparisonResult::kUndefined;
  if (y == V8_INFINITY) return ComparisonResult::kLessThan;
  if (y == -V8_INFINITY) return ComparisonResult::kGreaterThan;
  bool x_sign = x->sign();
  // Note that this is different from the double's sign bit for -0. That's
  // intentional because -0 must be treated like 0.
  bool y_sign = (y < 0);
  if (x_sign != y_sign) return UnequalSign(x_sign);
  if (y == 0) {
    DCHECK(!x_sign);
    return x->is_zero() ? ComparisonResult::kEqual
                        : ComparisonResult::kGreaterThan;
  }
  if (x->is_zero()) {
    DCHECK(!y_sign);
    return ComparisonResult::kLessThan;
  }
  uint64_t double_bits = bit_cast<uint64_t>(y);
  int raw_exponent =
      static_cast<int>(double_bits >> Double::kPhysicalSignificandSize) & 0x7FF;
  uint64_t mantissa = double_bits & Double::kSignificandMask;
  // Non-finite doubles are handled above.
  DCHECK_NE(raw_exponent, 0x7FF);
  int exponent = raw_exponent - 0x3FF;
  if (exponent < 0) {
    // The absolute value of the double is less than 1. Only 0n has an
    // absolute value smaller than that, but we've already covered that case.
    DCHECK(!x->is_zero());
    return AbsoluteGreater(x_sign);
  }
  int x_length = x->length();
  digit_t x_msd = x->digit(x_length - 1);
  int msd_leading_zeros = base::bits::CountLeadingZeros(x_msd);
  int x_bitlength = x_length * kDigitBits - msd_leading_zeros;
  int y_bitlength = exponent + 1;
  if (x_bitlength < y_bitlength) return AbsoluteLess(x_sign);
  if (x_bitlength > y_bitlength) return AbsoluteGreater(x_sign);

  // At this point, we know that signs and bit lengths (i.e. position of
  // the most significant bit in exponent-free representation) are identical.
  // {x} is not zero, {y} is finite and not denormal.
  // Now we virtually convert the double to an integer by shifting its
  // mantissa according to its exponent, so it will align with the BigInt {x},
  // and then we compare them bit for bit until we find a difference or the
  // least significant bit.
  //                    <----- 52 ------> <-- virtual trailing zeroes -->
  // y / mantissa:     1yyyyyyyyyyyyyyyyy 0000000000000000000000000000000
  // x / digits:    0001xxxx xxxxxxxx xxxxxxxx ...
  //                    <-->          <------>
  //              msd_topbit         kDigitBits
  //
  mantissa |= Double::kHiddenBit;
  const int kMantissaTopBit = 52;  // 0-indexed.
  // 0-indexed position of {x}'s most significant bit within the {msd}.
  int msd_topbit = kDigitBits - 1 - msd_leading_zeros;
  DCHECK_EQ(msd_topbit, (x_bitlength - 1) % kDigitBits);
  // Shifted chunk of {mantissa} for comparing with {digit}.
  digit_t compare_mantissa;
  // Number of unprocessed bits in {mantissa}. We'll keep them shifted to
  // the left (i.e. most significant part) of the underlying uint64_t.
  int remaining_mantissa_bits = 0;

  // First, compare the most significant digit against the beginning of
  // the mantissa.
  if (msd_topbit < kMantissaTopBit) {
    remaining_mantissa_bits = (kMantissaTopBit - msd_topbit);
    compare_mantissa = mantissa >> remaining_mantissa_bits;
    mantissa = mantissa << (64 - remaining_mantissa_bits);
  } else {
    DCHECK_GE(msd_topbit, kMantissaTopBit);
    compare_mantissa = mantissa << (msd_topbit - kMantissaTopBit);
    mantissa = 0;
  }
  if (x_msd > compare_mantissa) return AbsoluteGreater(x_sign);
  if (x_msd < compare_mantissa) return AbsoluteLess(x_sign);

  // Then, compare additional digits against any remaining mantissa bits.
  for (int digit_index = x_length - 2; digit_index >= 0; digit_index--) {
    if (remaining_mantissa_bits > 0) {
      remaining_mantissa_bits -= kDigitBits;
      if (sizeof(mantissa) != sizeof(x_msd)) {
        compare_mantissa = mantissa >> (64 - kDigitBits);
        // "& 63" to appease compilers. kDigitBits is 32 here anyway.
        mantissa = mantissa << (kDigitBits & 63);
      } else {
        compare_mantissa = mantissa;
        mantissa = 0;
      }
    } else {
      compare_mantissa = 0;
    }
    digit_t digit = x->digit(digit_index);
    if (digit > compare_mantissa) return AbsoluteGreater(x_sign);
    if (digit < compare_mantissa) return AbsoluteLess(x_sign);
  }

  // Integer parts are equal; check whether {y} has a fractional part.
  if (mantissa != 0) {
    DCHECK_GT(remaining_mantissa_bits, 0);
    return AbsoluteLess(x_sign);
  }
  return ComparisonResult::kEqual;
}

MaybeHandle<String> BigInt::ToString(Handle<BigInt> bigint, int radix) {
  Isolate* isolate = bigint->GetIsolate();
  if (bigint->is_zero()) {
    return isolate->factory()->NewStringFromStaticChars("0");
  }
  if (base::bits::IsPowerOfTwo(radix)) {
    return ToStringBasePowerOfTwo(bigint, radix);
  }
  return ToStringGeneric(bigint, radix);
}

namespace {

bool IsSafeInteger(double value) {
  if (std::isnan(value) || std::isinf(value)) return false;

  // Let integer be ! ToInteger(value).
  // If ! SameValueZero(integer, value) is false, return false.
  if (DoubleToInteger(value) != value) return false;

  return std::abs(value) <= kMaxSafeInteger;
}

}  // anonymous namespace

MaybeHandle<BigInt> BigInt::FromNumber(Isolate* isolate,
                                       Handle<Object> number) {
  DCHECK(number->IsNumber());
  if (number->IsSmi()) {
    return isolate->factory()->NewBigIntFromInt(Smi::cast(*number)->value());
  }
  if (!IsSafeInteger(Handle<HeapNumber>::cast(number)->value())) {
    THROW_NEW_ERROR(isolate,
                    NewRangeError(MessageTemplate::kBigIntFromNumber, number),
                    BigInt);
  }
  return isolate->factory()->NewBigIntFromSafeInteger(
      Handle<HeapNumber>::cast(number)->value());
}

MaybeHandle<BigInt> BigInt::FromObject(Isolate* isolate, Handle<Object> obj) {
  if (obj->IsJSReceiver()) {
    ASSIGN_RETURN_ON_EXCEPTION(
        isolate, obj,
        JSReceiver::ToPrimitive(Handle<JSReceiver>::cast(obj),
                                ToPrimitiveHint::kNumber),
        BigInt);
  }

  if (obj->IsBoolean()) {
    return isolate->factory()->NewBigIntFromInt(obj->BooleanValue());
  }
  if (obj->IsBigInt()) {
    return Handle<BigInt>::cast(obj);
  }
  if (obj->IsString()) {
    Handle<BigInt> n;
    if (!StringToBigInt(isolate, Handle<String>::cast(obj)).ToHandle(&n)) {
      THROW_NEW_ERROR(isolate,
                      NewSyntaxError(MessageTemplate::kBigIntFromObject, obj),
                      BigInt);
    }
    return n;
  }

  THROW_NEW_ERROR(
      isolate, NewTypeError(MessageTemplate::kBigIntFromObject, obj), BigInt);
}

Handle<Object> BigInt::ToNumber(Handle<BigInt> x) {
  Isolate* isolate = x->GetIsolate();
  if (x->is_zero()) return Handle<Smi>(Smi::kZero, isolate);
  if (x->length() == 1 && x->digit(0) < Smi::kMaxValue) {
    int value = static_cast<int>(x->digit(0));
    if (x->sign()) value = -value;
    return Handle<Smi>(Smi::FromInt(value), isolate);
  }
  double result = ToDouble(x);
  return isolate->factory()->NewHeapNumber(result);
}

double BigInt::ToDouble(Handle<BigInt> x) {
  if (x->is_zero()) return 0.0;
  int x_length = x->length();
  digit_t x_msd = x->digit(x_length - 1);
  int msd_leading_zeros = base::bits::CountLeadingZeros(x_msd);
  int x_bitlength = x_length * kDigitBits - msd_leading_zeros;
  if (x_bitlength > 1024) return x->sign() ? -V8_INFINITY : V8_INFINITY;
  uint64_t exponent = x_bitlength - 1;
  // We need the most significant bit shifted to the position of a double's
  // "hidden bit". We also need to hide that MSB, so we shift it out.
  uint64_t current_digit = x_msd;
  int digit_index = x_length - 1;
  int shift = msd_leading_zeros + 1 + (64 - kDigitBits);
  DCHECK_LE(1, shift);
  DCHECK_LE(shift, 64);
  uint64_t mantissa = (shift == 64) ? 0 : current_digit << shift;
  mantissa >>= 12;
  int mantissa_bits_unset = shift - 12;
  // If not all mantissa bits are defined yet, get more digits as needed.
  if (mantissa_bits_unset >= kDigitBits && digit_index > 0) {
    digit_index--;
    current_digit = static_cast<uint64_t>(x->digit(digit_index));
    mantissa |= (current_digit << (mantissa_bits_unset - kDigitBits));
    mantissa_bits_unset -= kDigitBits;
  }
  if (mantissa_bits_unset > 0 && digit_index > 0) {
    DCHECK_LT(mantissa_bits_unset, kDigitBits);
    digit_index--;
    current_digit = static_cast<uint64_t>(x->digit(digit_index));
    mantissa |= (current_digit >> (kDigitBits - mantissa_bits_unset));
    mantissa_bits_unset -= kDigitBits;
  }
  // If there are unconsumed digits left, we may have to round.
  Rounding rounding =
      DecideRounding(x, mantissa_bits_unset, digit_index, current_digit);
  if (rounding == kRoundUp || (rounding == kTie && (mantissa & 1) == 1)) {
    mantissa++;
    // Incrementing the mantissa can overflow the mantissa bits. In that case
    // the new mantissa will be all zero (plus hidden bit).
    if ((mantissa >> Double::kPhysicalSignificandSize) != 0) {
      mantissa = 0;
      exponent++;
      // Incrementing the exponent can overflow too.
      if (exponent > 1023) {
        return x->sign() ? -V8_INFINITY : V8_INFINITY;
      }
    }
  }
  // Assemble the result.
  uint64_t sign_bit = x->sign() ? (static_cast<uint64_t>(1) << 63) : 0;
  exponent = (exponent + 0x3FF) << Double::kPhysicalSignificandSize;
  uint64_t double_bits = sign_bit | exponent | mantissa;
  return bit_cast<double>(double_bits);
}

// This is its own function to keep control flow sane. The meaning of the
// parameters is defined by {ToDouble}'s local variable usage.
BigInt::Rounding BigInt::DecideRounding(Handle<BigInt> x,
                                        int mantissa_bits_unset,
                                        int digit_index,
                                        uint64_t current_digit) {
  if (mantissa_bits_unset > 0) return kRoundDown;
  int top_unconsumed_bit;
  if (mantissa_bits_unset < 0) {
    // There are unconsumed bits in {current_digit}.
    top_unconsumed_bit = -mantissa_bits_unset - 1;
  } else {
    DCHECK_EQ(mantissa_bits_unset, 0);
    // {current_digit} fit the mantissa exactly; look at the next digit.
    if (digit_index == 0) return kRoundDown;
    digit_index--;
    current_digit = static_cast<uint64_t>(x->digit(digit_index));
    top_unconsumed_bit = kDigitBits - 1;
  }
  // If the most significant remaining bit is 0, round down.
  uint64_t bitmask = static_cast<uint64_t>(1) << top_unconsumed_bit;
  if ((current_digit & bitmask) == 0) {
    return kRoundDown;
  }
  // If any other remaining bit is set, round up.
  bitmask -= 1;
  if ((current_digit & bitmask) != 0) return kRoundUp;
  for (; digit_index >= 0; digit_index--) {
    if (x->digit(digit_index) != 0) return kRoundUp;
  }
  return kTie;
}

void BigInt::Initialize(int length, bool zero_initialize) {
  set_length(length);
  set_sign(false);
  if (zero_initialize) {
    memset(reinterpret_cast<void*>(reinterpret_cast<Address>(this) +
                                   kDigitsOffset - kHeapObjectTag),
           0, length * kDigitSize);
#if DEBUG
  } else {
    memset(reinterpret_cast<void*>(reinterpret_cast<Address>(this) +
                                   kDigitsOffset - kHeapObjectTag),
           0xbf, length * kDigitSize);
#endif
  }
}

void BigInt::BigIntShortPrint(std::ostream& os) {
  if (sign()) os << "-";
  int len = length();
  if (len == 0) {
    os << "0";
    return;
  }
  if (len > 1) os << "...";
  os << digit(0);
}

// Private helpers for public methods.

Handle<BigInt> BigInt::AbsoluteAdd(Handle<BigInt> x, Handle<BigInt> y,
                                   bool result_sign) {
  if (x->length() < y->length()) return AbsoluteAdd(y, x, result_sign);
  if (x->is_zero()) {
    DCHECK(y->is_zero());
    return x;
  }
  if (y->is_zero()) {
    return result_sign == x->sign() ? x : UnaryMinus(x);
  }
  Handle<BigInt> result =
      x->GetIsolate()->factory()->NewBigIntRaw(x->length() + 1);
  digit_t carry = 0;
  int i = 0;
  for (; i < y->length(); i++) {
    digit_t new_carry = 0;
    digit_t sum = digit_add(x->digit(i), y->digit(i), &new_carry);
    sum = digit_add(sum, carry, &new_carry);
    result->set_digit(i, sum);
    carry = new_carry;
  }
  for (; i < x->length(); i++) {
    digit_t new_carry = 0;
    digit_t sum = digit_add(x->digit(i), carry, &new_carry);
    result->set_digit(i, sum);
    carry = new_carry;
  }
  result->set_digit(i, carry);
  result->set_sign(result_sign);
  result->RightTrim();
  return result;
}

Handle<BigInt> BigInt::AbsoluteSub(Handle<BigInt> x, Handle<BigInt> y,
                                   bool result_sign) {
  DCHECK(x->length() >= y->length());
  SLOW_DCHECK(AbsoluteCompare(x, y) >= 0);
  if (x->is_zero()) {
    DCHECK(y->is_zero());
    return x;
  }
  if (y->is_zero()) {
    return result_sign == x->sign() ? x : UnaryMinus(x);
  }
  Handle<BigInt> result = x->GetIsolate()->factory()->NewBigIntRaw(x->length());
  digit_t borrow = 0;
  int i = 0;
  for (; i < y->length(); i++) {
    digit_t new_borrow = 0;
    digit_t difference = digit_sub(x->digit(i), y->digit(i), &new_borrow);
    difference = digit_sub(difference, borrow, &new_borrow);
    result->set_digit(i, difference);
    borrow = new_borrow;
  }
  for (; i < x->length(); i++) {
    digit_t new_borrow = 0;
    digit_t difference = digit_sub(x->digit(i), borrow, &new_borrow);
    result->set_digit(i, difference);
    borrow = new_borrow;
  }
  DCHECK_EQ(0, borrow);
  result->set_sign(result_sign);
  result->RightTrim();
  return result;
}

// Computes 2^n - abs(y), assuming 2^n >= abs(y).
Handle<BigInt> BigInt::AbsoluteSubFromPowerOfTwo(uint64_t n, Handle<BigInt> y,
                                                 bool result_sign) {
  Handle<BigInt> x = PowerOfTwo(y->GetIsolate(), n);
  digit_t borrow = x->InplaceSub(*y, 0);
  for (int i = y->length(); borrow != 0; ++i) {
    DCHECK_LT(i, x->length());
    digit_t new_borrow = 0;
    digit_t new_digit = digit_sub(x->digit(i), borrow, &new_borrow);
    x->set_digit(i, new_digit);
    borrow = new_borrow;
  }
  x->set_sign(result_sign);
  x->RightTrim();
  return x;
}

// Adds 1 to the absolute value of {x} and sets the result's sign to {sign}.
// {result_storage} is optional; if present, it will be used to store the
// result, otherwise a new BigInt will be allocated for the result.
// {result_storage} and {x} may refer to the same BigInt for in-place
// modification.
Handle<BigInt> BigInt::AbsoluteAddOne(Handle<BigInt> x, bool sign,
                                      BigInt* result_storage) {
  int input_length = x->length();
  // The addition will overflow into a new digit if all existing digits are
  // at maximum.
  bool will_overflow = true;
  for (int i = 0; i < input_length; i++) {
    if (!digit_ismax(x->digit(i))) {
      will_overflow = false;
      break;
    }
  }
  int result_length = input_length + will_overflow;
  Isolate* isolate = x->GetIsolate();
  Handle<BigInt> result(result_storage, isolate);
  if (result_storage == nullptr) {
    result = isolate->factory()->NewBigIntRaw(result_length);
  } else {
    DCHECK(result->length() == result_length);
  }
  digit_t carry = 1;
  for (int i = 0; i < input_length; i++) {
    digit_t new_carry = 0;
    result->set_digit(i, digit_add(x->digit(i), carry, &new_carry));
    carry = new_carry;
  }
  if (result_length > input_length) {
    result->set_digit(input_length, carry);
  } else {
    DCHECK_EQ(carry, 0);
  }
  result->set_sign(sign);
  return result;
}

// Subtracts 1 from the absolute value of {x}. {x} must not be zero.
// Allocates a new BigInt of length {result_length} for the result;
// {result_length} must be at least as large as {x->length()}.
Handle<BigInt> BigInt::AbsoluteSubOne(Handle<BigInt> x, int result_length) {
  DCHECK(!x->is_zero());
  DCHECK(result_length >= x->length());
  Handle<BigInt> result =
      x->GetIsolate()->factory()->NewBigIntRaw(result_length);
  int length = x->length();
  digit_t borrow = 1;
  for (int i = 0; i < length; i++) {
    digit_t new_borrow = 0;
    result->set_digit(i, digit_sub(x->digit(i), borrow, &new_borrow));
    borrow = new_borrow;
  }
  DCHECK_EQ(borrow, 0);
  for (int i = length; i < result_length; i++) {
    result->set_digit(i, borrow);
  }
  return result;
}

// Helper for Absolute{And,AndNot,Or,Xor}.
// Performs the given binary {op} on digit pairs of {x} and {y}; when the
// end of the shorter of the two is reached, {extra_digits} configures how
// remaining digits in the longer input (if {symmetric} == kSymmetric, in
// {x} otherwise) are handled: copied to the result or ignored.
// If {result_storage} is non-nullptr, it will be used for the result and
// any extra digits in it will be zeroed out, otherwise a new BigInt (with
// the same length as the longer input) will be allocated.
// {result_storage} may alias {x} or {y} for in-place modification.
// Example:
//              y:             [ y2 ][ y1 ][ y0 ]
//              x:       [ x3 ][ x2 ][ x1 ][ x0 ]
//                          |     |     |     |
//                      (kCopy)  (op)  (op)  (op)
//                          |     |     |     |
//                          v     v     v     v
// result_storage: [  0 ][ x3 ][ r2 ][ r1 ][ r0 ]
inline Handle<BigInt> BigInt::AbsoluteBitwiseOp(
    Handle<BigInt> x, Handle<BigInt> y, BigInt* result_storage,
    ExtraDigitsHandling extra_digits, SymmetricOp symmetric,
    std::function<digit_t(digit_t, digit_t)> op) {
  int x_length = x->length();
  int y_length = y->length();
  int num_pairs = y_length;
  if (x_length < y_length) {
    num_pairs = x_length;
    if (symmetric == kSymmetric) {
      std::swap(x, y);
      std::swap(x_length, y_length);
    }
  }
  DCHECK(num_pairs == Min(x_length, y_length));
  Isolate* isolate = x->GetIsolate();
  Handle<BigInt> result(result_storage, isolate);
  int result_length = extra_digits == kCopy ? x_length : num_pairs;
  if (result_storage == nullptr) {
    result = isolate->factory()->NewBigIntRaw(result_length);
  } else {
    DCHECK(result_storage->length() >= result_length);
    result_length = result_storage->length();
  }
  int i = 0;
  for (; i < num_pairs; i++) {
    result->set_digit(i, op(x->digit(i), y->digit(i)));
  }
  if (extra_digits == kCopy) {
    for (; i < x_length; i++) {
      result->set_digit(i, x->digit(i));
    }
  }
  for (; i < result_length; i++) {
    result->set_digit(i, 0);
  }
  return result;
}

// If {result_storage} is non-nullptr, it will be used for the result,
// otherwise a new BigInt of appropriate length will be allocated.
// {result_storage} may alias {x} or {y} for in-place modification.
Handle<BigInt> BigInt::AbsoluteAnd(Handle<BigInt> x, Handle<BigInt> y,
                                   BigInt* result_storage) {
  return AbsoluteBitwiseOp(x, y, result_storage, kSkip, kSymmetric,
                           [](digit_t a, digit_t b) { return a & b; });
}

// If {result_storage} is non-nullptr, it will be used for the result,
// otherwise a new BigInt of appropriate length will be allocated.
// {result_storage} may alias {x} or {y} for in-place modification.
Handle<BigInt> BigInt::AbsoluteAndNot(Handle<BigInt> x, Handle<BigInt> y,
                                      BigInt* result_storage) {
  return AbsoluteBitwiseOp(x, y, result_storage, kCopy, kNotSymmetric,
                           [](digit_t a, digit_t b) { return a & ~b; });
}

// If {result_storage} is non-nullptr, it will be used for the result,
// otherwise a new BigInt of appropriate length will be allocated.
// {result_storage} may alias {x} or {y} for in-place modification.
Handle<BigInt> BigInt::AbsoluteOr(Handle<BigInt> x, Handle<BigInt> y,
                                  BigInt* result_storage) {
  return AbsoluteBitwiseOp(x, y, result_storage, kCopy, kSymmetric,
                           [](digit_t a, digit_t b) { return a | b; });
}

// If {result_storage} is non-nullptr, it will be used for the result,
// otherwise a new BigInt of appropriate length will be allocated.
// {result_storage} may alias {x} or {y} for in-place modification.
Handle<BigInt> BigInt::AbsoluteXor(Handle<BigInt> x, Handle<BigInt> y,
                                   BigInt* result_storage) {
  return AbsoluteBitwiseOp(x, y, result_storage, kCopy, kSymmetric,
                           [](digit_t a, digit_t b) { return a ^ b; });
}

// Returns a positive value if abs(x) > abs(y), a negative value if
// abs(x) < abs(y), or zero if abs(x) == abs(y).
int BigInt::AbsoluteCompare(Handle<BigInt> x, Handle<BigInt> y) {
  int diff = x->length() - y->length();
  if (diff != 0) return diff;
  int i = x->length() - 1;
  while (i >= 0 && x->digit(i) == y->digit(i)) i--;
  if (i < 0) return 0;
  return x->digit(i) > y->digit(i) ? 1 : -1;
}

// Like AbsoluteCompare but only for y = 2^n.
int BigInt::AbsoluteCompareToPowerOfTwo(Handle<BigInt> x, uint64_t n) {
  DCHECK_LE(n, kMaxSafeInteger);

  int x_length = x->length();
  uint64_t y_length = (n + kDigitBits) / kDigitBits;

  if (static_cast<uint64_t>(x_length) < y_length) return -1;
  if (static_cast<uint64_t>(x_length) > y_length) return +1;
  DCHECK_NE(x_length, 0);

  digit_t x_msd = x->digit(x_length - 1);
  digit_t y_msd = static_cast<digit_t>(1) << (n % kDigitBits);
  if (x_msd < y_msd) {
    return -1;
  } else if (x_msd > y_msd) {
    return +1;
  }

  for (int i = 0; i < x_length - 1; ++i) {
    if (x->digit(i) != 0) return 1;
  }

  return 0;
}

// Multiplies {multiplicand} with {multiplier} and adds the result to
// {accumulator}, starting at {accumulator_index} for the least-significant
// digit.
// Callers must ensure that {accumulator} is big enough to hold the result.
void BigInt::MultiplyAccumulate(Handle<BigInt> multiplicand, digit_t multiplier,
                                Handle<BigInt> accumulator,
                                int accumulator_index) {
  // This is a minimum requirement; the DCHECK in the second loop below
  // will enforce more as needed.
  DCHECK(accumulator->length() > multiplicand->length() + accumulator_index);
  if (multiplier == 0L) return;
  digit_t carry = 0;
  digit_t high = 0;
  for (int i = 0; i < multiplicand->length(); i++, accumulator_index++) {
    digit_t acc = accumulator->digit(accumulator_index);
    digit_t new_carry = 0;
    // Add last round's carryovers.
    acc = digit_add(acc, high, &new_carry);
    acc = digit_add(acc, carry, &new_carry);
    // Compute this round's multiplication.
    digit_t m_digit = multiplicand->digit(i);
    digit_t low = digit_mul(multiplier, m_digit, &high);
    acc = digit_add(acc, low, &new_carry);
    // Store result and prepare for next round.
    accumulator->set_digit(accumulator_index, acc);
    carry = new_carry;
  }
  for (; carry != 0 || high != 0; accumulator_index++) {
    DCHECK(accumulator_index < accumulator->length());
    digit_t acc = accumulator->digit(accumulator_index);
    digit_t new_carry = 0;
    acc = digit_add(acc, high, &new_carry);
    high = 0;
    acc = digit_add(acc, carry, &new_carry);
    accumulator->set_digit(accumulator_index, acc);
    carry = new_carry;
  }
}

// Multiplies {source} with {factor} and adds {summand} to the result.
// {result} and {source} may be the same BigInt for inplace modification.
void BigInt::InternalMultiplyAdd(BigInt* source, digit_t factor,
                                 digit_t summand, int n, BigInt* result) {
  DCHECK(source->length() >= n);
  DCHECK(result->length() >= n);
  digit_t carry = summand;
  digit_t high = 0;
  for (int i = 0; i < n; i++) {
    digit_t current = source->digit(i);
    digit_t new_carry = 0;
    // Compute this round's multiplication.
    digit_t new_high = 0;
    current = digit_mul(current, factor, &new_high);
    // Add last round's carryovers.
    current = digit_add(current, high, &new_carry);
    current = digit_add(current, carry, &new_carry);
    // Store result and prepare for next round.
    result->set_digit(i, current);
    carry = new_carry;
    high = new_high;
  }
  if (result->length() > n) {
    result->set_digit(n++, carry + high);
    // Current callers don't pass in such large results, but let's be robust.
    while (n < result->length()) {
      result->set_digit(n++, 0);
    }
  } else {
    CHECK_EQ(carry + high, 0);
  }
}

// Multiplies {this} with {factor} and adds {summand} to the result.
void BigInt::InplaceMultiplyAdd(uintptr_t factor, uintptr_t summand) {
  STATIC_ASSERT(sizeof(factor) == sizeof(digit_t));
  STATIC_ASSERT(sizeof(summand) == sizeof(digit_t));
  InternalMultiplyAdd(this, factor, summand, length(), this);
}

// Divides {x} by {divisor}, returning the result in {quotient} and {remainder}.
// Mathematically, the contract is:
// quotient = (x - remainder) / divisor, with 0 <= remainder < divisor.
// If {quotient} is an empty handle, an appropriately sized BigInt will be
// allocated for it; otherwise the caller must ensure that it is big enough.
// {quotient} can be the same as {x} for an in-place division. {quotient} can
// also be nullptr if the caller is only interested in the remainder.
void BigInt::AbsoluteDivSmall(Handle<BigInt> x, digit_t divisor,
                              Handle<BigInt>* quotient, digit_t* remainder) {
  DCHECK_NE(divisor, 0);
  DCHECK(!x->is_zero());  // Callers check anyway, no need to handle this.
  *remainder = 0;
  if (divisor == 1) {
    if (quotient != nullptr) *quotient = x;
    return;
  }

  int length = x->length();
  if (quotient != nullptr) {
    if ((*quotient).is_null()) {
      *quotient = x->GetIsolate()->factory()->NewBigIntRaw(length);
    }
    for (int i = length - 1; i >= 0; i--) {
      digit_t q = digit_div(*remainder, x->digit(i), divisor, remainder);
      (*quotient)->set_digit(i, q);
    }
  } else {
    for (int i = length - 1; i >= 0; i--) {
      digit_div(*remainder, x->digit(i), divisor, remainder);
    }
  }
}

// Divides {dividend} by {divisor}, returning the result in {quotient} and
// {remainder}. Mathematically, the contract is:
// quotient = (dividend - remainder) / divisor, with 0 <= remainder < divisor.
// Both {quotient} and {remainder} are optional, for callers that are only
// interested in one of them.
// See Knuth, Volume 2, section 4.3.1, Algorithm D.
void BigInt::AbsoluteDivLarge(Handle<BigInt> dividend, Handle<BigInt> divisor,
                              Handle<BigInt>* quotient,
                              Handle<BigInt>* remainder) {
  DCHECK_GE(divisor->length(), 2);
  DCHECK(dividend->length() >= divisor->length());
  Factory* factory = dividend->GetIsolate()->factory();
  // The unusual variable names inside this function are consistent with
  // Knuth's book, as well as with Go's implementation of this algorithm.
  // Maintaining this consistency is probably more useful than trying to
  // come up with more descriptive names for them.
  int n = divisor->length();
  int m = dividend->length() - n;

  // The quotient to be computed.
  Handle<BigInt> q;
  if (quotient != nullptr) q = factory->NewBigIntRaw(m + 1);
  // In each iteration, {qhatv} holds {divisor} * {current quotient digit}.
  // "v" is the book's name for {divisor}, "qhat" the current quotient digit.
  Handle<BigInt> qhatv = factory->NewBigIntRaw(n + 1);

  // D1.
  // Left-shift inputs so that the divisor's MSB is set. This is necessary
  // to prevent the digit-wise divisions (see digit_div call below) from
  // overflowing (they take a two digits wide input, and return a one digit
  // result).
  int shift = base::bits::CountLeadingZeros(divisor->digit(n - 1));
  if (shift > 0) {
    divisor = SpecialLeftShift(divisor, shift, kSameSizeResult);
  }
  // Holds the (continuously updated) remaining part of the dividend, which
  // eventually becomes the remainder.
  Handle<BigInt> u = SpecialLeftShift(dividend, shift, kAlwaysAddOneDigit);

  // D2.
  // Iterate over the dividend's digit (like the "grad school" algorithm).
  // {vn1} is the divisor's most significant digit.
  digit_t vn1 = divisor->digit(n - 1);
  for (int j = m; j >= 0; j--) {
    // D3.
    // Estimate the current iteration's quotient digit (see Knuth for details).
    // {qhat} is the current quotient digit.
    digit_t qhat = std::numeric_limits<digit_t>::max();
    // {ujn} is the dividend's most significant remaining digit.
    digit_t ujn = u->digit(j + n);
    if (ujn != vn1) {
      // {rhat} is the current iteration's remainder.
      digit_t rhat = 0;
      // Estimate the current quotient digit by dividing the most significant
      // digits of dividend and divisor. The result will not be too small,
      // but could be a bit too large.
      qhat = digit_div(ujn, u->digit(j + n - 1), vn1, &rhat);

      // Decrement the quotient estimate as needed by looking at the next
      // digit, i.e. by testing whether
      // qhat * v_{n-2} > (rhat << kDigitBits) + u_{j+n-2}.
      digit_t vn2 = divisor->digit(n - 2);
      digit_t ujn2 = u->digit(j + n - 2);
      while (ProductGreaterThan(qhat, vn2, rhat, ujn2)) {
        qhat--;
        digit_t prev_rhat = rhat;
        rhat += vn1;
        // v[n-1] >= 0, so this tests for overflow.
        if (rhat < prev_rhat) break;
      }
    }

    // D4.
    // Multiply the divisor with the current quotient digit, and subtract
    // it from the dividend. If there was "borrow", then the quotient digit
    // was one too high, so we must correct it and undo one subtraction of
    // the (shifted) divisor.
    InternalMultiplyAdd(*divisor, qhat, 0, n, *qhatv);
    digit_t c = u->InplaceSub(*qhatv, j);
    if (c != 0) {
      c = u->InplaceAdd(*divisor, j);
      u->set_digit(j + n, u->digit(j + n) + c);
      qhat--;
    }

    if (quotient != nullptr) q->set_digit(j, qhat);
  }
  if (quotient != nullptr) {
    *quotient = q;  // Caller will right-trim.
  }
  if (remainder != nullptr) {
    u->InplaceRightShift(shift);
    *remainder = u;
  }
}

// Returns whether (factor1 * factor2) > (high << kDigitBits) + low.
bool BigInt::ProductGreaterThan(digit_t factor1, digit_t factor2, digit_t high,
                                digit_t low) {
  digit_t result_high;
  digit_t result_low = digit_mul(factor1, factor2, &result_high);
  return result_high > high || (result_high == high && result_low > low);
}

// Adds {summand} onto {this}, starting with {summand}'s 0th digit
// at {this}'s {start_index}'th digit. Returns the "carry" (0 or 1).
BigInt::digit_t BigInt::InplaceAdd(BigInt* summand, int start_index) {
  digit_t carry = 0;
  int n = summand->length();
  DCHECK(length() >= start_index + n);
  for (int i = 0; i < n; i++) {
    digit_t new_carry = 0;
    digit_t sum =
        digit_add(digit(start_index + i), summand->digit(i), &new_carry);
    sum = digit_add(sum, carry, &new_carry);
    set_digit(start_index + i, sum);
    carry = new_carry;
  }
  return carry;
}

// Subtracts {subtrahend} from {this}, starting with {subtrahend}'s 0th digit
// at {this}'s {start_index}-th digit. Returns the "borrow" (0 or 1).
BigInt::digit_t BigInt::InplaceSub(BigInt* subtrahend, int start_index) {
  digit_t borrow = 0;
  int n = subtrahend->length();
  DCHECK(length() >= start_index + n);
  for (int i = 0; i < n; i++) {
    digit_t new_borrow = 0;
    digit_t difference =
        digit_sub(digit(start_index + i), subtrahend->digit(i), &new_borrow);
    difference = digit_sub(difference, borrow, &new_borrow);
    set_digit(start_index + i, difference);
    borrow = new_borrow;
  }
  return borrow;
}

void BigInt::InplaceRightShift(int shift) {
  DCHECK_GE(shift, 0);
  DCHECK_LT(shift, kDigitBits);
  DCHECK_GT(length(), 0);
  DCHECK_EQ(digit(0) & ((static_cast<digit_t>(1) << shift) - 1), 0);
  if (shift == 0) return;
  digit_t carry = digit(0) >> shift;
  int last = length() - 1;
  for (int i = 0; i < last; i++) {
    digit_t d = digit(i + 1);
    set_digit(i, (d << (kDigitBits - shift)) | carry);
    carry = d >> shift;
  }
  set_digit(last, carry);
  RightTrim();
}

// Always copies the input, even when {shift} == 0.
// {shift} must be less than kDigitBits, {x} must be non-zero.
Handle<BigInt> BigInt::SpecialLeftShift(Handle<BigInt> x, int shift,
                                        SpecialLeftShiftMode mode) {
  DCHECK_GE(shift, 0);
  DCHECK_LT(shift, kDigitBits);
  DCHECK_GT(x->length(), 0);
  int n = x->length();
  int result_length = mode == kAlwaysAddOneDigit ? n + 1 : n;
  Handle<BigInt> result =
      x->GetIsolate()->factory()->NewBigIntRaw(result_length);
  if (shift == 0) {
    for (int i = 0; i < n; i++) result->set_digit(i, x->digit(i));
    if (mode == kAlwaysAddOneDigit) result->set_digit(n, 0);
    return result;
  }
  DCHECK_GT(shift, 0);
  digit_t carry = 0;
  for (int i = 0; i < n; i++) {
    digit_t d = x->digit(i);
    result->set_digit(i, (d << shift) | carry);
    carry = d >> (kDigitBits - shift);
  }
  if (mode == kAlwaysAddOneDigit) {
    result->set_digit(n, carry);
  } else {
    DCHECK_EQ(mode, kSameSizeResult);
    DCHECK_EQ(carry, 0);
  }
  return result;
}

MaybeHandle<BigInt> BigInt::LeftShiftByAbsolute(Handle<BigInt> x,
                                                Handle<BigInt> y) {
  Isolate* isolate = x->GetIsolate();
  Maybe<digit_t> maybe_shift = ToShiftAmount(y);
  if (maybe_shift.IsNothing()) {
    THROW_NEW_ERROR(isolate, NewRangeError(MessageTemplate::kBigIntTooBig),
                    BigInt);
  }
  digit_t shift = maybe_shift.FromJust();
  int digit_shift = static_cast<int>(shift / kDigitBits);
  int bits_shift = static_cast<int>(shift % kDigitBits);
  int length = x->length();
  bool grow = bits_shift != 0 &&
              (x->digit(length - 1) >> (kDigitBits - bits_shift)) != 0;
  int result_length = length + digit_shift + grow;
  if (result_length > kMaxLength) {
    THROW_NEW_ERROR(isolate, NewRangeError(MessageTemplate::kBigIntTooBig),
                    BigInt);
  }
  Handle<BigInt> result = isolate->factory()->NewBigIntRaw(result_length);
  if (bits_shift == 0) {
    int i = 0;
    for (; i < digit_shift; i++) result->set_digit(i, 0ul);
    for (; i < result_length; i++) {
      result->set_digit(i, x->digit(i - digit_shift));
    }
  } else {
    digit_t carry = 0;
    for (int i = 0; i < digit_shift; i++) result->set_digit(i, 0ul);
    for (int i = 0; i < length; i++) {
      digit_t d = x->digit(i);
      result->set_digit(i + digit_shift, (d << bits_shift) | carry);
      carry = d >> (kDigitBits - bits_shift);
    }
    if (grow) {
      result->set_digit(length + digit_shift, carry);
    } else {
      DCHECK_EQ(carry, 0);
    }
  }
  result->set_sign(x->sign());
  result->RightTrim();
  return result;
}

Handle<BigInt> BigInt::RightShiftByAbsolute(Handle<BigInt> x,
                                            Handle<BigInt> y) {
  Isolate* isolate = x->GetIsolate();
  int length = x->length();
  bool sign = x->sign();
  Maybe<digit_t> maybe_shift = ToShiftAmount(y);
  if (maybe_shift.IsNothing()) {
    return RightShiftByMaximum(isolate, sign);
  }
  digit_t shift = maybe_shift.FromJust();
  int digit_shift = static_cast<int>(shift / kDigitBits);
  int bits_shift = static_cast<int>(shift % kDigitBits);
  int result_length = length - digit_shift;
  if (result_length <= 0) {
    return RightShiftByMaximum(isolate, sign);
  }
  // For negative numbers, round down if any bit was shifted out (so that e.g.
  // -5n >> 1n == -3n and not -2n). Check now whether this will happen and
  // whether it can cause overflow into a new digit. If we allocate the result
  // large enough up front, it avoids having to do a second allocation later.
  bool must_round_down = false;
  if (sign) {
    const digit_t mask = (static_cast<digit_t>(1) << bits_shift) - 1;
    if ((x->digit(digit_shift) & mask) != 0) {
      must_round_down = true;
    } else {
      for (int i = 0; i < digit_shift; i++) {
        if (x->digit(i) != 0) {
          must_round_down = true;
          break;
        }
      }
    }
  }
  // If bits_shift is non-zero, it frees up bits, preventing overflow.
  if (must_round_down && bits_shift == 0) {
    // Overflow cannot happen if the most significant digit has unset bits.
    digit_t msd = x->digit(length - 1);
    bool rounding_can_overflow = digit_ismax(msd);
    if (rounding_can_overflow) result_length++;
  }

  Handle<BigInt> result = isolate->factory()->NewBigIntRaw(result_length);
  if (bits_shift == 0) {
    for (int i = digit_shift; i < length; i++) {
      result->set_digit(i - digit_shift, x->digit(i));
    }
  } else {
    digit_t carry = x->digit(digit_shift) >> bits_shift;
    int last = length - digit_shift - 1;
    for (int i = 0; i < last; i++) {
      digit_t d = x->digit(i + digit_shift + 1);
      result->set_digit(i, (d << (kDigitBits - bits_shift)) | carry);
      carry = d >> bits_shift;
    }
    result->set_digit(last, carry);
  }

  if (sign) {
    result->set_sign(true);
    if (must_round_down) {
      // Since the result is negative, rounding down means adding one to
      // its absolute value.
      result = AbsoluteAddOne(result, true, *result);
    }
  }
  result->RightTrim();
  return result;
}

Handle<BigInt> BigInt::RightShiftByMaximum(Isolate* isolate, bool sign) {
  if (sign) {
    // TODO(jkummerow): Consider caching a canonical -1n BigInt.
    return isolate->factory()->NewBigIntFromInt(-1);
  } else {
    // TODO(jkummerow): Consider caching a canonical zero BigInt.
    return isolate->factory()->NewBigIntFromInt(0);
  }
}

// Returns the value of {x} if it is less than the maximum bit length of
// a BigInt, or Nothing otherwise.
Maybe<BigInt::digit_t> BigInt::ToShiftAmount(Handle<BigInt> x) {
  if (x->length() > 1) return Nothing<digit_t>();
  digit_t value = x->digit(0);
  STATIC_ASSERT(kMaxLength * kDigitBits < std::numeric_limits<digit_t>::max());
  if (value > kMaxLength * kDigitBits) return Nothing<digit_t>();
  return Just(value);
}

Handle<BigInt> BigInt::Copy(Handle<BigInt> source) {
  int length = source->length();
  Handle<BigInt> result = source->GetIsolate()->factory()->NewBigIntRaw(length);
  memcpy(result->address() + HeapObject::kHeaderSize,
         source->address() + HeapObject::kHeaderSize,
         SizeFor(length) - HeapObject::kHeaderSize);
  return result;
}

// Lookup table for the maximum number of bits required per character of a
// base-N string representation of a number. To increase accuracy, the array
// value is the actual value multiplied by 32. To generate this table:
// for (var i = 0; i <= 36; i++) { print(Math.ceil(Math.log2(i) * 32) + ","); }
constexpr uint8_t kMaxBitsPerChar[] = {
    0,   0,   32,  51,  64,  75,  83,  90,  96,  // 0..8
    102, 107, 111, 115, 119, 122, 126, 128,      // 9..16
    131, 134, 136, 139, 141, 143, 145, 147,      // 17..24
    149, 151, 153, 154, 156, 158, 159, 160,      // 25..32
    162, 163, 165, 166,                          // 33..36
};

static const int kBitsPerCharTableShift = 5;
static const size_t kBitsPerCharTableMultiplier = 1u << kBitsPerCharTableShift;

MaybeHandle<BigInt> BigInt::AllocateFor(Isolate* isolate, int radix,
                                        int charcount,
                                        ShouldThrow should_throw) {
  DCHECK(2 <= radix && radix <= 36);
  DCHECK_GE(charcount, 0);
  size_t bits_per_char = kMaxBitsPerChar[radix];
  size_t chars = static_cast<size_t>(charcount);
  const int roundup = kBitsPerCharTableMultiplier - 1;
  if (chars <= (std::numeric_limits<size_t>::max() - roundup) / bits_per_char) {
    size_t bits_min = bits_per_char * chars;
    // Divide by 32 (see table), rounding up.
    bits_min = (bits_min + roundup) >> kBitsPerCharTableShift;
    if (bits_min <= static_cast<size_t>(kMaxInt)) {
      // Divide by kDigitsBits, rounding up.
      int length = (static_cast<int>(bits_min) + kDigitBits - 1) / kDigitBits;
      if (length <= BigInt::kMaxLength) {
        return isolate->factory()->NewBigInt(length);
      }
    }
  }
  // All the overflow/maximum checks above fall through to here.
  if (should_throw == kThrowOnError) {
    THROW_NEW_ERROR(isolate, NewRangeError(MessageTemplate::kBigIntTooBig),
                    BigInt);
  } else {
    return MaybeHandle<BigInt>();
  }
}

void BigInt::RightTrim() {
  int old_length = length();
  int new_length = old_length;
  while (new_length > 0 && digit(new_length - 1) == 0) new_length--;
  int to_trim = old_length - new_length;
  if (to_trim == 0) return;
  int size_delta = to_trim * kDigitSize;
  Address new_end = this->address() + SizeFor(new_length);
  Heap* heap = GetHeap();
  heap->CreateFillerObjectAt(new_end, size_delta, ClearRecordedSlots::kNo);
  // Canonicalize -0n.
  if (new_length == 0) set_sign(false);
  set_length(new_length);
}

static const char kConversionChars[] = "0123456789abcdefghijklmnopqrstuvwxyz";

MaybeHandle<String> BigInt::ToStringBasePowerOfTwo(Handle<BigInt> x,
                                                   int radix) {
  STATIC_ASSERT(base::bits::IsPowerOfTwo(kDigitBits));
  DCHECK(base::bits::IsPowerOfTwo(radix));
  DCHECK(radix >= 2 && radix <= 32);
  DCHECK(!x->is_zero());
  Isolate* isolate = x->GetIsolate();

  const int length = x->length();
  const bool sign = x->sign();
  const int bits_per_char = base::bits::CountTrailingZeros(radix);
  const int char_mask = radix - 1;
  // Compute the length of the resulting string: divide the bit length of the
  // BigInt by the number of bits representable per character (rounding up).
  const digit_t msd = x->digit(length - 1);
  const int msd_leading_zeros = base::bits::CountLeadingZeros(msd);
  const size_t bit_length = length * kDigitBits - msd_leading_zeros;
  const size_t chars_required =
      (bit_length + bits_per_char - 1) / bits_per_char + sign;

  if (chars_required > String::kMaxLength) {
    THROW_NEW_ERROR(isolate, NewInvalidStringLengthError(), String);
  }

  Handle<SeqOneByteString> result =
      isolate->factory()
          ->NewRawOneByteString(static_cast<int>(chars_required))
          .ToHandleChecked();
  DisallowHeapAllocation no_gc;
  uint8_t* buffer = result->GetChars();
  // Print the number into the string, starting from the last position.
  int pos = static_cast<int>(chars_required - 1);
  digit_t digit = 0;
  // Keeps track of how many unprocessed bits there are in {digit}.
  int available_bits = 0;
  for (int i = 0; i < length - 1; i++) {
    digit_t new_digit = x->digit(i);
    // Take any leftover bits from the last iteration into account.
    int current = (digit | (new_digit << available_bits)) & char_mask;
    buffer[pos--] = kConversionChars[current];
    int consumed_bits = bits_per_char - available_bits;
    digit = new_digit >> consumed_bits;
    available_bits = kDigitBits - consumed_bits;
    while (available_bits >= bits_per_char) {
      buffer[pos--] = kConversionChars[digit & char_mask];
      digit >>= bits_per_char;
      available_bits -= bits_per_char;
    }
  }
  // Take any leftover bits from the last iteration into account.
  int current = (digit | (msd << available_bits)) & char_mask;
  buffer[pos--] = kConversionChars[current];
  digit = msd >> (bits_per_char - available_bits);
  while (digit != 0) {
    buffer[pos--] = kConversionChars[digit & char_mask];
    digit >>= bits_per_char;
  }
  if (sign) buffer[pos--] = '-';
  DCHECK_EQ(pos, -1);
  return result;
}

MaybeHandle<String> BigInt::ToStringGeneric(Handle<BigInt> x, int radix) {
  DCHECK(radix >= 2 && radix <= 36);
  DCHECK(!x->is_zero());
  Heap* heap = x->GetHeap();
  Isolate* isolate = heap->isolate();

  const int length = x->length();
  const bool sign = x->sign();

  // Compute (an overapproximation of) the length of the resulting string:
  // Divide bit length of the BigInt by bits representable per character.
  const size_t bit_length =
      length * kDigitBits - base::bits::CountLeadingZeros(x->digit(length - 1));
  // Maximum number of bits we can represent with one character. We'll use this
  // to find an appropriate chunk size below.
  const uint8_t max_bits_per_char = kMaxBitsPerChar[radix];
  // For estimating result length, we have to be pessimistic and work with
  // the minimum number of bits one character can represent.
  const uint8_t min_bits_per_char = max_bits_per_char - 1;
  // Perform the following computation with uint64_t to avoid overflows.
  uint64_t chars_required = bit_length;
  chars_required *= kBitsPerCharTableMultiplier;
  chars_required += min_bits_per_char - 1;  // Round up.
  chars_required /= min_bits_per_char;
  chars_required += sign;

  if (chars_required > String::kMaxLength) {
    THROW_NEW_ERROR(isolate, NewInvalidStringLengthError(), String);
  }
  Handle<SeqOneByteString> result =
      isolate->factory()
          ->NewRawOneByteString(static_cast<int>(chars_required))
          .ToHandleChecked();

#if DEBUG
  // Zap the string first.
  {
    DisallowHeapAllocation no_gc;
    uint8_t* chars = result->GetChars();
    for (int i = 0; i < static_cast<int>(chars_required); i++) chars[i] = '?';
  }
#endif

  // We assemble the result string in reverse order, and then reverse it.
  // TODO(jkummerow): Consider building the string from the right, and
  // left-shifting it if the length estimate was too large.
  int pos = 0;

  digit_t last_digit;
  if (length == 1) {
    last_digit = x->digit(0);
  } else {
    int chunk_chars =
        kDigitBits * kBitsPerCharTableMultiplier / max_bits_per_char;
    digit_t chunk_divisor = digit_pow(radix, chunk_chars);
    // By construction of chunk_chars, there can't have been overflow.
    DCHECK_NE(chunk_divisor, 0);
    int nonzero_digit = length - 1;
    DCHECK_NE(x->digit(nonzero_digit), 0);
    // {rest} holds the part of the BigInt that we haven't looked at yet.
    // Not to be confused with "remainder"!
    Handle<BigInt> rest;
    // In the first round, divide the input, allocating a new BigInt for
    // the result == rest; from then on divide the rest in-place.
    Handle<BigInt>* dividend = &x;
    do {
      digit_t chunk;
      AbsoluteDivSmall(*dividend, chunk_divisor, &rest, &chunk);
      DCHECK(!rest.is_null());
      dividend = &rest;
      DisallowHeapAllocation no_gc;
      uint8_t* chars = result->GetChars();
      for (int i = 0; i < chunk_chars; i++) {
        chars[pos++] = kConversionChars[chunk % radix];
        chunk /= radix;
      }
      DCHECK_EQ(chunk, 0);
      if (rest->digit(nonzero_digit) == 0) nonzero_digit--;
      // We can never clear more than one digit per iteration, because
      // chunk_divisor is smaller than max digit value.
      DCHECK_GT(rest->digit(nonzero_digit), 0);
    } while (nonzero_digit > 0);
    last_digit = rest->digit(0);
  }
  DisallowHeapAllocation no_gc;
  uint8_t* chars = result->GetChars();
  do {
    chars[pos++] = kConversionChars[last_digit % radix];
    last_digit /= radix;
  } while (last_digit > 0);
  DCHECK_GE(pos, 1);
  DCHECK(pos <= static_cast<int>(chars_required));
  // Remove leading zeroes.
  while (pos > 1 && chars[pos - 1] == '0') pos--;
  if (sign) chars[pos++] = '-';
  // Trim any over-allocation (which can happen due to conservative estimates).
  if (pos < static_cast<int>(chars_required)) {
    result->synchronized_set_length(pos);
    int string_size =
        SeqOneByteString::SizeFor(static_cast<int>(chars_required));
    int needed_size = SeqOneByteString::SizeFor(pos);
    if (needed_size < string_size) {
      Address new_end = result->address() + needed_size;
      heap->CreateFillerObjectAt(new_end, (string_size - needed_size),
                                 ClearRecordedSlots::kNo);
    }
  }
  // Reverse the string.
  for (int i = 0, j = pos - 1; i < j; i++, j--) {
    uint8_t tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
  }
#if DEBUG
  // Verify that all characters have been written.
  DCHECK(result->length() == pos);
  for (int i = 0; i < pos; i++) DCHECK_NE(chars[i], '?');
#endif
  return result;
}

Handle<BigInt> BigInt::AsIntN(uint64_t n, Handle<BigInt> x) {
  DCHECK_LE(n, kMaxSafeInteger);

  Handle<BigInt> result = AbsoluteAsUintN(n, x);
  if (result->is_zero()) return result;
  DCHECK_NE(n, 0);
  DCHECK(!x->is_zero());

  int comparison = AbsoluteCompareToPowerOfTwo(result, n - 1);

  if (!x->sign()) {
    // x is positive.  Note that result == x mod 2^n.
    if (comparison < 0) return result;
    // Return (x mod 2^n) - 2^n, which is -(2^n - x mod 2^n).
    return AbsoluteSubFromPowerOfTwo(n, result, true);
  }

  // x is negative.  Note that abs(result) == -x mod 2^n.
  // We use the following facts:
  // a) (x mod 2^n) == 2^n - abs(result)
  // b) (x mod 2^n) >= 2^(n-1)  iff
  //    2^n - abs(result) >= 2^(n-1)  iff
  //    2^(n-1) >= abs(result)  iff
  //    comparison <= 0
  if (comparison <= 0) {
    // Return (x mod 2^n) - 2^n, which is -abs(result).
    return result->sign() ? result : UnaryMinus(result);
  }
  // Return x mod 2^n.
  return AbsoluteSubFromPowerOfTwo(n, result, false);
}

Handle<BigInt> BigInt::AsUintN(uint64_t n, Handle<BigInt> x) {
  DCHECK_LE(n, kMaxSafeInteger);
  Handle<BigInt> result = AbsoluteAsUintN(n, x);
  if (!x->sign()) return result;

  // x is negative.  Note that abs(result) == -x mod 2^n.
  // We use the following facts:
  // a) If result == 0, then (x mod 2^n) == 0.
  // b) If result != 0, then (x mod 2^n) == 2^n - abs(result).
  if (result->is_zero()) return result;
  return AbsoluteSubFromPowerOfTwo(n, result, false);
}

Handle<BigInt> BigInt::AbsoluteAsUintN(uint64_t n, Handle<BigInt> x) {
  DCHECK_LE(n, kMaxSafeInteger);
  Isolate* isolate = x->GetIsolate();
  if (n == 0) return isolate->factory()->NewBigIntFromInt(0);

  uint64_t total_bits = x->length() * kDigitBits;
  if (total_bits <= n) return x;
  DCHECK_LE(n, kMaxInt);
  int N = static_cast<int>(n);

  int needed_digits = (N + (kDigitBits - 1)) / kDigitBits;
  DCHECK_LE(needed_digits, x->length());
  Handle<BigInt> result = isolate->factory()->NewBigIntRaw(needed_digits);

  // Copy all digits except the MSD.
  int last = needed_digits - 1;
  for (int i = 0; i < last; i++) {
    result->set_digit(i, x->digit(i));
  }

  // The MSD might contain extra bits that we don't want.
  digit_t msd = x->digit(last);
  digit_t mask = std::numeric_limits<digit_t>::max();
  if (N % kDigitBits != 0) mask = mask >> (kDigitBits - (N % kDigitBits));
  result->set_digit(last, msd & mask);

  result->RightTrim();
  return result;
}

Handle<BigInt> BigInt::PowerOfTwo(Isolate* isolate, uint64_t n) {
  DCHECK_LE(n, kMaxSafeInteger);
  STATIC_ASSERT(kMaxLengthBits < kMaxInt);
  // Truncate n to (1 + kMaxLengthBits), such that it doesn't overflow int but
  // still causes the allocation to fail if it was too large.
  int needed_bits =
      1 + static_cast<int>(std::min(n, static_cast<uint64_t>(kMaxLengthBits)));
  int needed_digits = (needed_bits + (kDigitBits - 1)) / kDigitBits;
  Handle<BigInt> result = isolate->factory()->NewBigInt(needed_digits);
  // All bits are zero. Now set the "n-th" bit.
  digit_t msd = static_cast<digit_t>(1) << (n % kDigitBits);
  result->set_digit(needed_digits - 1, msd);
  return result;
}

// Digit arithmetic helpers.

#if V8_TARGET_ARCH_32_BIT
#define HAVE_TWODIGIT_T 1
typedef uint64_t twodigit_t;
#elif defined(__SIZEOF_INT128__)
// Both Clang and GCC support this on x64.
#define HAVE_TWODIGIT_T 1
typedef __uint128_t twodigit_t;
#endif

// {carry} must point to an initialized digit_t and will either be incremented
// by one or left alone.
inline BigInt::digit_t BigInt::digit_add(digit_t a, digit_t b, digit_t* carry) {
#if HAVE_TWODIGIT_T
  twodigit_t result = static_cast<twodigit_t>(a) + static_cast<twodigit_t>(b);
  *carry += result >> kDigitBits;
  return static_cast<digit_t>(result);
#else
  digit_t result = a + b;
  if (result < a) *carry += 1;
  return result;
#endif
}

// {borrow} must point to an initialized digit_t and will either be incremented
// by one or left alone.
inline BigInt::digit_t BigInt::digit_sub(digit_t a, digit_t b,
                                         digit_t* borrow) {
#if HAVE_TWODIGIT_T
  twodigit_t result = static_cast<twodigit_t>(a) - static_cast<twodigit_t>(b);
  *borrow += (result >> kDigitBits) & 1;
  return static_cast<digit_t>(result);
#else
  digit_t result = a - b;
  if (result > a) *borrow += 1;
  return static_cast<digit_t>(result);
#endif
}

// Returns the low half of the result. High half is in {high}.
inline BigInt::digit_t BigInt::digit_mul(digit_t a, digit_t b, digit_t* high) {
#if HAVE_TWODIGIT_T
  twodigit_t result = static_cast<twodigit_t>(a) * static_cast<twodigit_t>(b);
  *high = result >> kDigitBits;
  return static_cast<digit_t>(result);
#else
  // Multiply in half-pointer-sized chunks.
  // For inputs [AH AL]*[BH BL], the result is:
  //
  //            [AL*BL]  // r_low
  //    +    [AL*BH]     // r_mid1
  //    +    [AH*BL]     // r_mid2
  //    + [AH*BH]        // r_high
  //    = [R4 R3 R2 R1]  // high = [R4 R3], low = [R2 R1]
  //
  // Where of course we must be careful with carries between the columns.
  digit_t a_low = a & kHalfDigitMask;
  digit_t a_high = a >> kHalfDigitBits;
  digit_t b_low = b & kHalfDigitMask;
  digit_t b_high = b >> kHalfDigitBits;

  digit_t r_low = a_low * b_low;
  digit_t r_mid1 = a_low * b_high;
  digit_t r_mid2 = a_high * b_low;
  digit_t r_high = a_high * b_high;

  digit_t carry = 0;
  digit_t low = digit_add(r_low, r_mid1 << kHalfDigitBits, &carry);
  low = digit_add(low, r_mid2 << kHalfDigitBits, &carry);
  *high =
      (r_mid1 >> kHalfDigitBits) + (r_mid2 >> kHalfDigitBits) + r_high + carry;
  return low;
#endif
}

// Returns the quotient.
// quotient = (high << kDigitBits + low - remainder) / divisor
BigInt::digit_t BigInt::digit_div(digit_t high, digit_t low, digit_t divisor,
                                  digit_t* remainder) {
  DCHECK(high < divisor);
#if V8_TARGET_ARCH_X64 && (__GNUC__ || __clang__)
  digit_t quotient;
  digit_t rem;
  __asm__("divq  %[divisor]"
          // Outputs: {quotient} will be in rax, {rem} in rdx.
          : "=a"(quotient), "=d"(rem)
          // Inputs: put {high} into rdx, {low} into rax, and {divisor} into
          // any register or stack slot.
          : "d"(high), "a"(low), [divisor] "rm"(divisor));
  *remainder = rem;
  return quotient;
#elif V8_TARGET_ARCH_IA32 && (__GNUC__ || __clang__)
  digit_t quotient;
  digit_t rem;
  __asm__("divl  %[divisor]"
          // Outputs: {quotient} will be in eax, {rem} in edx.
          : "=a"(quotient), "=d"(rem)
          // Inputs: put {high} into edx, {low} into eax, and {divisor} into
          // any register or stack slot.
          : "d"(high), "a"(low), [divisor] "rm"(divisor));
  *remainder = rem;
  return quotient;
#else
  static const digit_t kHalfDigitBase = 1ull << kHalfDigitBits;
  // Adapted from Warren, Hacker's Delight, p. 152.
  int s = base::bits::CountLeadingZeros(divisor);
  divisor <<= s;

  digit_t vn1 = divisor >> kHalfDigitBits;
  digit_t vn0 = divisor & kHalfDigitMask;
  // {s} can be 0. "low >> kDigitBits == low" on x86, so we "&" it with
  // {s_zero_mask} which is 0 if s == 0 and all 1-bits otherwise.
  STATIC_ASSERT(sizeof(intptr_t) == sizeof(digit_t));
  digit_t s_zero_mask =
      static_cast<digit_t>(static_cast<intptr_t>(-s) >> (kDigitBits - 1));
  digit_t un32 = (high << s) | ((low >> (kDigitBits - s)) & s_zero_mask);
  digit_t un10 = low << s;
  digit_t un1 = un10 >> kHalfDigitBits;
  digit_t un0 = un10 & kHalfDigitMask;
  digit_t q1 = un32 / vn1;
  digit_t rhat = un32 - q1 * vn1;

  while (q1 >= kHalfDigitBase || q1 * vn0 > rhat * kHalfDigitBase + un1) {
    q1--;
    rhat += vn1;
    if (rhat >= kHalfDigitBase) break;
  }

  digit_t un21 = un32 * kHalfDigitBase + un1 - q1 * divisor;
  digit_t q0 = un21 / vn1;
  rhat = un21 - q0 * vn1;

  while (q0 >= kHalfDigitBase || q0 * vn0 > rhat * kHalfDigitBase + un0) {
    q0--;
    rhat += vn1;
    if (rhat >= kHalfDigitBase) break;
  }

  *remainder = (un21 * kHalfDigitBase + un0 - q0 * divisor) >> s;
  return q1 * kHalfDigitBase + q0;
#endif
}

// Raises {base} to the power of {exponent}. Does not check for overflow.
BigInt::digit_t BigInt::digit_pow(digit_t base, digit_t exponent) {
  digit_t result = 1ull;
  while (exponent > 0) {
    if (exponent & 1) {
      result *= base;
    }
    exponent >>= 1;
    base *= base;
  }
  return result;
}

#undef HAVE_TWODIGIT_T

#ifdef OBJECT_PRINT
void BigInt::BigIntPrint(std::ostream& os) {
  DisallowHeapAllocation no_gc;
  HeapObject::PrintHeader(os, "BigInt");
  int len = length();
  os << "- length: " << len << "\n";
  os << "- sign: " << sign() << "\n";
  if (len > 0) {
    os << "- digits:";
    for (int i = 0; i < len; i++) {
      os << "\n    0x" << std::hex << digit(i);
    }
    os << std::dec << "\n";
  }
}
#endif  // OBJECT_PRINT

}  // namespace internal
}  // namespace v8
