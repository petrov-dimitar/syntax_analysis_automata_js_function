const input_code = `function LLLLL(){}`

const grouped_symbols = {
    operator: ["+", "-", "*", "%"],
    letter: ["L"],
    number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    space: [" "],
}

const _getSymbolType = (symbol) => {
    let result = symbol;
    Object.keys(grouped_symbols).forEach(object_key => {
        if (grouped_symbols[object_key].some(element => element === symbol)) {
            result = object_key
        }
    })
    return result
    // return symbol;

}

const state_input_output_state = {
    // current_state : {input: output_state}
    start: {f: "f"},
    f: { u: "u" },
    u: { n: "n" },
    n: { c: "c" },
    c: { t: "t" },
    t: { i: "i" },
    i: { o: "o" },
    o: { n: "n_2" },
    n_2: { space: "function_name_start" },
    function_name_start: { letter: "function_name_running" },
    function_name_running: { letter: "function_name_running", "(": "function_params_start" },
    function_params_start: { letter: "function_param_running", ")": "function_params_end" },
    function_param_running: { letter: "function_param_running", number: "function_param_running", ")": "function_params_end" },
    function_params_end: { "{": "function_body_start" },
    function_body_start: { "}": "function_body_end" },
}

const accepting_states = ["function_body_end"]

let current_state = "start";
let output_state = undefined;

for (index in input_code) {
    const input_character = _getSymbolType(input_code[index])

    output_state = state_input_output_state[current_state][input_character];

    console.log({ current_state }, { input_character }, { output_state });

    
    if (+index + 1 === input_code.length && accepting_states.includes(output_state)){
        console.log("Code syntax accepted")
        return
    }
    
    if(!output_state) {
        console.log("ERROR AT INPUT CHARACTER" + input_character + " AT INDEX: " + index)
        return
    }

    current_state = output_state;
}