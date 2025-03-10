import { BlocklyWorkspace } from '../../../components/Blockly/index'
import { useState, useCallback, useMemo } from 'react'
import * as Blockly from 'blockly/core'
import { javascriptGenerator } from 'blockly/javascript'
import Swal from 'sweetalert2'
import 'blockly/blocks'
import '../../../components/Blockly/dev-index.css'

// Danh sách các bài học
const lessons = [
  {
    title: 'Bài học 1: Sử dụng "if" và "true"',
    description: 'Kéo khối "if", đặt khối "true" vào điều kiện, thêm hành động in "Hello world".',
    toolbox: {
      kind: 'flyoutToolbox',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_boolean', fields: { BOOL: 'TRUE' } },
        {
          kind: 'block',
          type: 'text_print',
          inputs: {
            TEXT: { block: { type: 'text', fields: { TEXT: 'Hello world' } } }
          }
        }
      ]
    },
    expectedOutput: 'Hello world'
  },
  {
    title: 'Bài học 2: Sử dụng "if" và "false"',
    description: 'Kéo khối "if", đặt khối "false" vào điều kiện, thêm hành động in "something wrong".',
    toolbox: {
      kind: 'flyoutToolbox',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_boolean', fields: { BOOL: 'FALSE' } },
        {
          kind: 'block',
          type: 'text_print',
          inputs: {
            TEXT: { block: { type: 'text', fields: { TEXT: 'something wrong' } } }
          }
        }
      ]
    },
    expectedOutput: 'something wrong'
  },
  {
    title: 'Bài học 3: Sử dụng "if" với điều kiện phức tạp',
    description:
      'Kéo khối "if", đặt khối "and" vào điều kiện, kết hợp "not" và "true", thêm hành động in "Điều kiện phức tạp".',
    toolbox: {
      kind: 'flyoutToolbox',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_operation', fields: { OP: 'AND' } },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean', fields: { BOOL: 'TRUE' } },
        {
          kind: 'block',
          type: 'text_print',
          inputs: {
            TEXT: { block: { type: 'text', fields: { TEXT: 'Điều kiện phức tạp' } } }
          }
        }
      ]
    },
    expectedOutput: 'Điều kiện phức tạp'
  },
  {
    title: 'Bài học 4: Sử dụng câu lệnh "if-else"',
    description:
      'Kéo khối "if-else", đặt một điều kiện (số lớn hơn 10), thêm hành động in "Số lớn hơn 10" ở nhánh if và "Số nhỏ hơn hoặc bằng 10" ở nhánh else.',
    toolbox: {
      kind: 'flyoutToolbox',
      contents: [
        { kind: 'block', type: 'controls_ifelse' }, // Khối if-else
        {
          kind: 'block',
          type: 'logic_compare',
          fields: { OP: 'GT' }, // So sánh lớn hơn
          inputs: {
            A: { block: { type: 'math_number', fields: { NUM: 5 } } }, // Số đầu
            B: { block: { type: 'math_number', fields: { NUM: 10 } } } // Số thứ hai
          }
        },
        {
          kind: 'block',
          type: 'text_print',
          inputs: {
            TEXT: { block: { type: 'text', fields: { TEXT: 'Số lớn hơn 10' } } }
          }
        },
        {
          kind: 'block',
          type: 'text_print',
          inputs: {
            TEXT: { block: { type: 'text', fields: { TEXT: 'Số nhỏ hơn hoặc bằng 10' } } }
          }
        }
      ]
    },
    expectedOutput: ['Số lớn hơn 10', 'Số nhỏ hơn hoặc bằng 10']
  }
]

interface LessonLogicProps {
  onComplete?: () => void;
}

const LessonLogic = ({ onComplete }: LessonLogicProps) => {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [workspace, setWorkspace] = useState<Blockly.Workspace | null>(null)
  const [generatedCode, setGeneratedCode] = useState('')

  const onWorkspaceChange = useCallback((ws: Blockly.Workspace) => {
    const code = javascriptGenerator.workspaceToCode(ws)
    setGeneratedCode(code)
  }, [])

  const runCode = () => {
    try {
      let output = ''
      const originalConsoleLog = console.log
      console.log = (message) => {
        output += message + '\n'
        originalConsoleLog(message)
      }

      const fixedCode = generatedCode.replace(/window\.alert/g, 'console.log')
      new Function(fixedCode)()
      console.log = originalConsoleLog

      const expectedOutput = lessons[currentLesson].expectedOutput
      const expectedOutputs = (typeof expectedOutput === 'string' ? expectedOutput.split('\n') : expectedOutput) as string[]

      const finalOutput = output.trim()

      if (expectedOutputs.some(e => finalOutput.includes(e.trim()))) {
        Swal.fire({
          title: '🎉 Chính xác!',
          text: 'Bạn đã hoàn thành bài học!',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'Tiếp tục bài tiếp theo'
        }).then(() => {
          if (currentLesson < lessons.length - 1) {
            setCurrentLesson(currentLesson + 1)
          } else {
            Swal.fire('🏆 Hoàn thành!', 'Bạn đã hoàn thành tất cả bài học!', 'success')
            if (onComplete) {
              onComplete()
            }
          }
        })
      } else {
        Swal.fire('❌ Sai rồi!', 'Vui lòng kiểm tra lại bài làm!', 'error')
      }
    } catch {
      Swal.fire('❌ Lỗi!', 'Có lỗi trong chương trình, hãy kiểm tra lại!', 'error')
    }
  }

  const toolboxConfiguration = useMemo(() => {
    return lessons[currentLesson]?.toolbox || { kind: 'flyoutToolbox', contents: [] }
  }, [currentLesson])

  return (
    <div className='lesson-container'>
      <div className='flex justify-between'>
        <div>
          <h2>{lessons[currentLesson].title}</h2>
          <p>{lessons[currentLesson].description}</p>
        </div>
        <div>
          <button className='run-button' onClick={runCode}>
            ⏩ Chạy chương trình
          </button>
        </div>
      </div>

      <div className='blockly-container'>
        <BlocklyWorkspace
          toolboxConfiguration={toolboxConfiguration}
          workspaceConfiguration={{ grid: { spacing: 20, length: 3, colour: '#ccc', snap: true } }}
          className='fill-height'
          onWorkspaceChange={onWorkspaceChange}
        />
      </div>

      <h3>Generated JavaScript Code:</h3>
      <pre className='code-box'>{generatedCode}</pre>
    </div>
  )
}

export default LessonLogic
