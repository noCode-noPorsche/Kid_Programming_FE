import { useState, useCallback } from "react";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import Swal from "sweetalert2";
import "blockly/blocks";
import "../../components/dev-index.css";
import { BlocklyWorkspace } from "../../../components/Blockly";

// Danh sách các bài học
const lessons = [
    {
        title: "Bài 1: In lời chào nhiều lần",
        description: "Dùng vòng lặp 'repeat' để hiển thị 'Xin chào!' 5 lần.",
        toolbox: {
            kind: "categoryToolbox",
            contents: [
                {
                    kind: "category",
                    name: "Vòng lặp",
                    colour: "#5CA65C",
                    contents: [
                        { kind: "block", type: "controls_repeat_ext", inputs: { TIMES: { block: { type: "math_number", fields: { NUM: 5 } } } } },
                        { kind: "block", type: "text_print", inputs: { TEXT: { block: { type: "text", fields: { TEXT: "Xin chào!" } } } } },
                        { kind: "block", type: "text" },
              {
                kind: "block",
                blockxml:
                  '<block type="text_print"><value name="TEXT"><shadow type="text">abc</shadow></value></block>',
              },
                    ],
                },
            ],
        },
        expectedOutput: "Xin chào!\nXin chào!\nXin chào!\nXin chào!\nXin chào!"
    },
    {
        title: "Bài 2: Đếm từ 1 đến 10",
        description: "Dùng vòng lặp 'repeat' kết hợp với biến đếm để hiển thị số từ 1 đến 10.",
        toolbox: {
            kind: "categoryToolbox",
            contents: [
                {
                    kind: "category",
                    name: "Vòng lặp",
                    colour: "#5CA65C",
                    contents: [
                        { kind: "block", type: "controls_repeat_ext", inputs: { TIMES: { block: { type: "math_number", fields: { NUM: 10 } } } } },
                        { kind: "block", type: "variables_set", fields: { VAR: "x" }, inputs: { VALUE: { block: { type: "math_number", fields: { NUM: 0 } } } } },
                        { kind: "block", type: "math_change", fields: { VAR: "x" }, inputs: { DELTA: { block: { type: "math_number", fields: { NUM: 1 } } } } },
                        { kind: "block", type: "text_print", inputs: { TEXT: { block: { type: "variables_get", fields: { VAR: "x" } } } } },
                    ],
                },
            ],
        },
        expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
    },
    {
        title: "Bài 3: Tính tổng các số từ 1 đến 10",
        description: "Dùng vòng lặp 'repeat' để tính tổng các số từ 1 đến 10.",
        toolbox: {
            kind: "categoryToolbox",
            contents: [
                {
                    kind: "category",
                    name: "Vòng lặp",
                    colour: "#5CA65C",
                    contents: [
                        { kind: "block", type: "variables_set", fields: { VAR: "tổng" }, inputs: { VALUE: { block: { type: "math_number", fields: { NUM: 0 } } } } },
                        { kind: "block", type: "controls_repeat_ext", inputs: { TIMES: { block: { type: "math_number", fields: { NUM: 10 } } } } },
                        { kind: "block", type: "variables_set", fields: { VAR: "x" }, inputs: { VALUE: { block: { type: "math_number", fields: { NUM: 1 } } } } },
                        { kind: "block", type: "math_change", fields: { VAR: "tổng" }, inputs: { DELTA: { block: { type: "variables_get", fields: { VAR: "x" } } } } },
                        { kind: "block", type: "math_change", fields: { VAR: "x" }, inputs: { DELTA: { block: { type: "math_number", fields: { NUM: 1 } } } } },
                        { kind: "block", type: "text_print", inputs: { TEXT: { block: { type: "variables_get", fields: { VAR: "tổng" } } } } },
                    ],
                },
            ],
        },
        expectedOutput: "55"
    }
];

const LessonLoop = () => {
    const [currentLesson, setCurrentLesson] = useState(0);
    const [workspace, setWorkspace] = useState<Blockly.Workspace | null>(null);
    const [generatedCode, setGeneratedCode] = useState("");

    // Khi workspace thay đổi, cập nhật mã code
    const onWorkspaceChange = useCallback((ws: Blockly.Workspace) => {
        const code = javascriptGenerator.workspaceToCode(ws);
        setGeneratedCode(code);
    }, []);

    // Chạy chương trình để kiểm tra kết quả
    const runCode = () => {
        try {
            let output = "";
            const originalConsoleLog = console.log;
            console.log = (message) => {
                output += message + "\n"; // Chỉ lưu kết quả
                originalConsoleLog(message);
            };
            const fixedCode = generatedCode.replace(/window\.alert/g, "console.log");
            new Function(fixedCode)();
            console.log = originalConsoleLog;

            // Chuẩn hóa output trước khi so sánh
            // const expectedOutput = lessons[currentLesson].expectedOutput.trim();
            // const finalOutput = output.trim();


            // So sánh output với kết quả mong đợi
            
            if (output.trim() === lessons[currentLesson].expectedOutput) {
                Swal.fire("🎉 Chính xác!", "Bạn đã hoàn thành bài học!", "success").then(() => {
                    if (currentLesson < lessons.length - 1) {
                        setCurrentLesson(currentLesson + 1);
                    } else {
                        Swal.fire("🏆 Hoàn thành!", "Bạn đã hoàn thành tất cả bài học!", "success");
                    }
                });
            } else {
                Swal.fire("❌ Sai rồi!", "Vui lòng kiểm tra lại bài làm!", "error");
            }
        } catch (error) {
            Swal.fire("❌ Lỗi!", "Có lỗi trong chương trình, hãy kiểm tra lại!", "error");
        }
    };




    return (
        <div className="lesson-container">
            <h2>{lessons[currentLesson].title}</h2>
            <p>{lessons[currentLesson].description}</p>
            <div className="blockly-container">
                <BlocklyWorkspace
                    toolboxConfiguration={lessons[currentLesson].toolbox}
                    workspaceConfiguration={{ grid: { spacing: 20, length: 3, colour: "#ccc", snap: true } }}
                    className="fill-height"
                    onWorkspaceChange={(ws) => {
                        setWorkspace(ws);
                        onWorkspaceChange(ws);
                    }}
                />
            </div>

            {/* Khu vực hiển thị code */}
            <h3>Generated JavaScript Code:</h3>
            <pre className="code-box">{generatedCode}</pre>

            {/* Nút chạy chương trình */}
            <button className="run-button" onClick={runCode}>⏩ Chạy chương trình</button>
        </div>
    );

}
export default LessonLoop
