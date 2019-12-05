function executeIntcode(state){
    let pc = 0;
    // let state = code;

    while( ! ( pc >= state.length ) ){
        let opcode = state[pc];
        if (opcode != 1 && opcode != 2 && opcode != 99) { throw "bad opcode"};
        if (opcode == 99) break;

        let a_loc = state[pc+1]
        let b_loc = state[pc+2]
        let out_loc = state[pc+3]

        // console.log(`opcode: ${opcode}, a: ${a}, b: ${b}, target: ${target}`)

        switch(opcode) {
            case 1:
                state[out_loc] = state[a_loc] + state[b_loc];
                break;
            case 2:
                state[out_loc] = state[a_loc] * state[b_loc];
                break
        }

        pc += 4;
    }

    return state;
}

module.exports = { executeIntcode };