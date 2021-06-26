/**
 * @todo Implement error checking, with line and error descriptors
 *       Errors shouldn't be reported once encountered instead report as many errors as possible.
 * @todo Add other svg element support, with image editing support like bluring , SVG filters, etc.
 */
class Pictorial {
    /**
     * @description This function breaks the code into tokens
     * @param {String} str Pictorial code to tokenize
     * @returns {Array<String>} Returns tokens
     */
    lexer(str) {
        str = str.replace(/\/\*.*\*\//g, ""); // Ignore the comments
        return str.match(/(#[a-z][_a-z]*)+|<[a-z]+>|"[^"]*"|[a-z]+|line|path|circle|ellipse|rect|text|[0-9]+/g);
    }

    /**
     * @description This builds an object, intermediate representation(IR) of the final result
     * @param {Array<String>} tokens An array of lexemes
     * @returns {Object} an abstract syntax tree
     */
    buildAST = tokens => {
        let ast = Object.create(null);
        ast.children = Array();
        let skipId = null;
        tokens.forEach((i, idx, arr) => {
            // console.log(i);
            if(skipId !== idx) {
            // For compiler directives
            if(i.startsWith("#")) {
                ast[i.slice(1, i.length)] = arr[idx + 1].includes("<") ? arr[idx + 1].slice(1, arr[idx + 1].length - 1) : arr[idx + 1];
                skipId = idx + 1;
            } else if(i.match(/path|text|line|circle|ellipse|rect/g)) {
                let val = null;
                switch(i) {
                    case "circle":
                        skipId = idx + 6;
                        // console.log(arr[idx + 7]);
                        val = Object.create(null);
                        val.name = "circle";
                        val.values = arr.splice(idx + 1, 6);
                        val.attr = Object.create(null);
                        val.attr.cx = val.values[0];
                        val.attr.cy = val.values[1];
                        val.attr.r = val.values[2];
                        val.attr.stroke = val.values[3];
                        val.attr["stroke-width"] = val.values[4];
                        val.attr.fill = val.values[5];
                        ast.children.push(val);
                        break;
                    case "rect":
                        skipId = idx + 7;
                        // console.log(arr[idx + 7]);
                        val = Object.create(null);
                        val.name =  "rect";
                        val.values = arr.splice(idx + 1, 7);
                        val.attr = Object.create(null);
                        val.attr.x = val.values[0];
                        val.attr.y = val.values[1];
                        val.attr.width = val.values[2];
                        val.attr.height = val.values[3];
                        val.attr.style = val.values[4];
                        ast.children.push(val);
                        break;
                    case "text":
                        skipId = idx + 4;
                        // console.log(arr[idx + 3]);
                        val = Object.create(null);
                        val.name = "text";
                        val.values = arr.splice(idx + 1, 4);
                        val.attr = Object.create(null);
                        val.attr.x = val.values[0];
                        val.attr.y = val.values[1];
                        val.attr.fill = val.values[2];
                        val.inner = val.values[3];
                        // val.style = val.values[4];
                        ast.children.push(val);
                        break;
                    case "line":
                        skipId = idx + 6;
                        // console.log(arr[idx + 6]);
                        val = Object.create(null);
                        val.name = "line";
                        val.values = arr.splice(idx + 1, 6);
                        val.attr = Object.create(null);
                        val.attr.x1 = val.values[0];
                        val.attr.y1 = val.values[1];
                        val.attr.x2 = val.values[2];
                        val.attr.y2 = val.values[3];
                        val.attr.stroke = val.values[4];
                        val.attr["stroke-width"] = val.values[5];
                        ast.children.push(val);
                        break;
                }
            }
        }
        });
        return ast;
    }

    /**
     * @description Compiles the ast to svg, if there's an error it should throw it.
     * @param {Object} tree The Abstract Syntax Tree
     * @returns {Object} SVG element
     */
    compile(tree) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", tree.doc_width ? tree.doc_width : 300);
        svg.setAttribute("height", tree.doc_height ? tree.doc_height : 300);
        svg.setAttribute("style", tree.doc_style ? tree.doc_style : "background: white");
        tree.children.map(i => {
            const elem = document.createElementNS("http://www.w3.org/2000/svg", i.name);
            for(let x in i.attr) {
                elem.setAttribute(x, i.attr[x]);
            }
            if(i.inner) {
                const txt = document.createTextNode(i.inner);
                elem.appendChild(txt);
            }
            svg.append(elem);
        });
        svg.setAttribute("version", "1.1");
        return svg;
    }

    /**
     * @description The execute function takes the code directly and does the process from lexing to final svg element.
     * @param {String} code Code written in Pictorial language
     * @returns {Object} Compiled SVG picture
     */
    execute(code) {
        const tokens = this.lexer(code);
        const ast = this.buildAST(tokens);
        return this.compile(ast);
    }
}

/* For debugging purpose */
// const Pic = new Pictorial;
// document.body.innerHTML = "";
// document.body.append(Pic.execute(`#use <svg>      /* Tells pictorial to compile to SVG */
// #doc_width  300 /* Sets the pictures width */
// #doc_height 400 /* Sets the pictures height */

// circle 80 45 138 green 10 red
// rect 23 13 200 200 red 5 dodgerblue
// text 32 32 green "Hello world"
// line 12 10 54 32 12 purple`));

