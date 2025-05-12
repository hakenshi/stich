import { Command } from "commander";
import { makeComponent } from "../commands/makeComponent";
import inquirer from "inquirer";

const program = new Command()

program.name("stich").description("Stich CLI - Nextjs and React development tools").version("0.1.0")

program.command('init <project>')
    .description("Helps you caffold a new NextJS or a new vite with react project.")
    // .option("--template", "template", 'next')
    // .option('--with-orm', 'orm', '')
    // .option("--with-prettier", 'withPrettier', '')
    .action((project, options) => {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "packageManager",
                    message: "Select a package manager:",
                    choices: ["npm", "yarn", "pnpm", "bun"],
                    default: "npm",
                },
                {
                    type: "list",
                    name: "framework",
                    message: "Choose your react framework for the project:",
                    choices: ["Next.js", "React Router", "Tanstack Start", "Pure React with Vite and Typescript"],
                    default: "Next.js",
                },
                // {
                //     type: "list",
                //     name: "orms",
                //     message: "Choose a orm for the pr oject (not obrigatory):",
                //     choices: ['Drizzle', "Prisma", 'No, thanks.'],
                //     default: "No, thanks.",
                // },
                // {
                //     type: "confirm",
                //     name: "prettier",
                //     message: "Would you like to add prettier to your app?",
                //     choices: ["Yes", "No"],
                // }
            ])
            .then((answers: { packageManager: "npm" | "yarn" | "pnpm" | "bun"; framework: "Next.js" | "React Router" | "Tanstack Start" | "Pure React with Vite and Typescript"; }) => {
                const packageManagers: Record<"bun" | "yarn" | "npm" | "pnpm", string> = {
                    bun: "bunx",
                    yarn: "yarn dlx",
                    npm: "npx",
                    pnpm: "pnpm dlx"
                };

                const frameworks: Record<string, string> = {
                    "React Router": "create-react-route@latest",
                    "Next.js": "create-next-app@latest",
                    "Tanstack Start": "gitpick TanStack/router/tree/main/examples/react/start-basic",
                    "Pure React with Vite and Typescript": "create-vite@latest --template react-vite"
                };

                const answer = `${packageManagers[answers.packageManager]} ${frameworks[answers.framework]} ${project}`
                
            });
    })

program.command("make:component <name>")
    .description("Creates an empty react component")
    .option('--with-children', "withChildren", '')
    .option('--with-props', "withProps", '')
    .option('--with-styles', "withStyles", '')
    .action(makeComponent)

program.command('deploy')
    .description('Deploys this project to vercel.')

program.parse(process.argv)