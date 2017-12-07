// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef V8_WASM_BASELINE_LIFTOFF_ASSEMBLER_IA32_H_
#define V8_WASM_BASELINE_LIFTOFF_ASSEMBLER_IA32_H_

#include "src/wasm/baseline/liftoff-assembler.h"

#include "src/assembler.h"
#include "src/wasm/wasm-opcodes.h"

namespace v8 {
namespace internal {
namespace wasm {

namespace liftoff {

inline Operand GetStackSlot(uint32_t index) {
  // ebp-8 holds the stack marker, first stack slot is located at ebp-16.
  return Operand(ebp, -16 - 8 * index);
}

}  // namespace liftoff

void LiftoffAssembler::ReserveStackSpace(uint32_t space) {
  stack_space_ = space;
  sub(esp, Immediate(space));
}

void LiftoffAssembler::LoadConstant(Register reg, WasmValue value) {
  switch (value.type()) {
    case kWasmI32:
      if (value.to_i32() == 0) {
        xor_(reg, reg);
      } else {
        mov(reg, Immediate(value.to_i32()));
      }
      break;
    default:
      UNIMPLEMENTED();
  }
}

void LiftoffAssembler::Load(Register dst, Address addr,
                            RelocInfo::Mode reloc_mode) {
  mov(dst, Operand(reinterpret_cast<uint32_t>(addr), reloc_mode));
}

void LiftoffAssembler::Store(Address addr, Register reg,
                             PinnedRegisterScope pinned_regs,
                             RelocInfo::Mode reloc_mode) {
  mov(Operand(reinterpret_cast<uint32_t>(addr), reloc_mode), reg);
}

void LiftoffAssembler::LoadCallerFrameSlot(Register dst,
                                           uint32_t caller_slot_idx) {
  mov(dst, Operand(ebp, 4 + 4 * caller_slot_idx));
}

void LiftoffAssembler::MoveStackValue(uint32_t dst_index, uint32_t src_index,
                                      wasm::ValueType type) {
  DCHECK_NE(dst_index, src_index);
  DCHECK_EQ(kWasmI32, type);
  if (cache_state_.has_unused_register()) {
    Register reg = GetUnusedRegister(type);
    Fill(reg, src_index);
    Spill(dst_index, reg);
  } else {
    push(liftoff::GetStackSlot(src_index));
    pop(liftoff::GetStackSlot(dst_index));
  }
}

void LiftoffAssembler::MoveToReturnRegister(Register reg) {
  if (reg != eax) mov(eax, reg);
}

void LiftoffAssembler::Spill(uint32_t index, Register reg) {
  // TODO(clemensh): Handle different types here.
  mov(liftoff::GetStackSlot(index), reg);
}

void LiftoffAssembler::Spill(uint32_t index, WasmValue value) {
  // TODO(clemensh): Handle different types here.
  mov(liftoff::GetStackSlot(index), Immediate(value.to_i32()));
}

void LiftoffAssembler::Fill(Register reg, uint32_t index) {
  // TODO(clemensh): Handle different types here.
  mov(reg, liftoff::GetStackSlot(index));
}

void LiftoffAssembler::emit_i32_add(Register dst, Register lhs, Register rhs) {
  if (lhs != dst) {
    lea(dst, Operand(lhs, rhs, times_1, 0));
  } else {
    add(dst, rhs);
  }
}

void LiftoffAssembler::emit_i32_sub(Register dst, Register lhs, Register rhs) {
  if (dst == rhs) {
    neg(dst);
    add(dst, lhs);
  } else {
    if (dst != lhs) mov(dst, lhs);
    sub(dst, rhs);
  }
}

#define COMMUTATIVE_I32_BINOP(name, instruction)                     \
  void LiftoffAssembler::emit_i32_##name(Register dst, Register lhs, \
                                         Register rhs) {             \
    if (dst == rhs) {                                                \
      instruction(dst, lhs);                                         \
    } else {                                                         \
      if (dst != lhs) mov(dst, lhs);                                 \
      instruction(dst, rhs);                                         \
    }                                                                \
  }

// clang-format off
COMMUTATIVE_I32_BINOP(mul, imul)
COMMUTATIVE_I32_BINOP(and, and_)
COMMUTATIVE_I32_BINOP(or, or_)
COMMUTATIVE_I32_BINOP(xor, xor_)
// clang-format on

#undef DEFAULT_I32_BINOP

void LiftoffAssembler::JumpIfZero(Register reg, Label* label) {
  test(reg, reg);
  j(zero, label);
}

}  // namespace wasm
}  // namespace internal
}  // namespace v8

#endif  // V8_WASM_BASELINE_LIFTOFF_ASSEMBLER_IA32_H_
