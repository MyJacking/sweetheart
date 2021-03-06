"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./shared/logger"));
var commander_1 = require("commander");
var create_1 = require("./commands/create");
var compile_1 = require("./commands/compile");
var release_1 = require("./commands/release");
var jest_1 = require("./commands/jest");
var program = new commander_1.Command();
program.version("sweetheart-design-script ".concat(require('../package.json').version)).usage('<command> [options]');
program.command('create <name>').description('创建组件目录').action(create_1.create);
program
    .command('compile')
    .description('编译组件库代码')
    .option('-nu, --noUmd', '不编译 umd 目标代码')
    .action(compile_1.compile);
program
    .command('release')
    .option('-r --remote <remote>', '远程名称')
    .description('释放所有的包并生成变更日志')
    .action(release_1.release);
program
    .command('jest')
    .description('Run Jest in work directory')
    .option('-w, --watch', 'Watch files for changes and rerun tests related to changed files')
    .option('-wa, --watchAll', 'Watch files for changes and rerun all tests when something changes')
    .option('-c, --component <componentName>', 'Test a specific component')
    .option('-cc --clearCache', 'Clear test cache')
    .action(jest_1.jest);
program.on('command:*', function (_a) {
    var _b = __read(_a, 1), cmd = _b[0];
    program.outputHelp();
    logger_1.default.error("\nUnknown command ".concat(cmd, ".\n"));
    process.exitCode = 1;
});
program.parse();
