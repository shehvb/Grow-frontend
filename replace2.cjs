const fs = require('fs');

const file = 'src/components/auth/Signup.tsx';
const lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('d="M13.875 18.825A10.05')) {
    lines[i] = '                <IoIosEyeOff className="w-5 h-5" />';
  }
  if (lines[i].includes('d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"')) {
    lines[i] = '                <FaEye className="w-5 h-5" />';
  }
}

let content = lines.join('\n');

if (!content.includes('import { FaEye }')) {
  content = content.replace(
    'import { FaUserTie } from "react-icons/fa";',
    'import { FaUserTie } from "react-icons/fa";\nimport { FaEye } from "react-icons/fa6";\nimport { IoIosEyeOff } from "react-icons/io";'
  );
}

fs.writeFileSync(file, content);
console.log('Replaced SVGs by lines in', file);
