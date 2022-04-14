import React from 'react'
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import {Controlled as CodeMirror} from "react-codemirror2";
import {Component} from "react";

require("codemirror/theme/dracula.css");
let hBeautify = require("js-beautify").html;

interface Prop {
    value?: string | undefined,
}

interface State {
    code: string,
    visible: boolean
}

export class HtmlEditor extends Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.state = {
            code: hBeautify(this.props.value ?? "", {indent_size: 2}),
            visible: true
        };
    }

    updateCode = (e: string) => {
        this.setState({code: e});
    };

    autoFormatSelection = () => {
        let code = this.state.code;
        let formattedHTML = hBeautify(code, {indent_size: 2});
        this.setState({code: formattedHTML});
    };

    public getCode = () => {
        return this.state.code;
    }

    public setCode = (code: string) => {
        let formattedHTML = hBeautify(code, {indent_size: 2});
        this.setState({code: formattedHTML})
    }

    public toggleVisible = (visible: boolean) => {
        this.setState({visible: visible})
    }

    render() {
        let options = {
            height: "100%",
            lineNumbers: true,
            tabSize: 2,
            mode: "xml",
            extraKeys: {"Shift-Tab": this.autoFormatSelection},
        };
        return (
            <div className={this.state.visible ? "visible-imp" : "hidden"}>
                <div className="card text-white bg-dark rounded-0 h-100">
                    <div className="card-header">
                        HTML
                        <a
                            className="btn btn-outline-light float-right btn-sm"
                            href="#"
                            data-toggle="modal"
                            data-target="#codeconfig"
                        >
                            <i className="fa fa-cog"/>
                        </a>
                    </div>
                    <div className="card-body p-0">
                        <CodeMirror
                            value={this.state.code}
                            options={options}
                            onBeforeChange={(editor, data, value) => {
                                this.setState({code: value});
                            }}
                            onChange={(editor, data, value) => {
                                this.setState({code: value});
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default HtmlEditor;