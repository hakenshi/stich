import path from "node:path"
import fs from "node:fs"
import ejs from "ejs"
import chalk from "chalk"

type MakeComponentStyles = {
    withChildren?: boolean
    withStyles?: boolean
    withProps?: boolean
}

export async function makeComponent(name: string, options: MakeComponentStyles) {

    const hasSrcDirectory = fs.existsSync("src")
    const componentDir = hasSrcDirectory ? path.join(process.cwd(), 'src/components') : path.join(process.cwd(), 'components')

    if (fs.existsSync(path.join(componentDir, `${name}.tsx`))) {
        console.log(chalk.red(`Component: "${name}" already exists.`))
        return
    }

    fs.mkdirSync(componentDir, { recursive: true })


    let templatePath = path.join(__dirname, "../templates/components/component.ejs")

    if (options.withChildren) {
        templatePath = path.join(__dirname, "../templates/components/component-with-children.ejs")
    }

    if (options.withProps) {
        templatePath = path.join(__dirname, "../templates/components/component-with-props.ejs")
    }

    if (options.withStyles) {
        fs.writeFileSync(path.join(componentDir, `${name}.modules.css`), "")
    }

    const componentContent = await ejs.renderFile(templatePath, { name })

    if (options.withStyles) {
        fs.writeFileSync(path.join(componentDir, `index.tsx`), componentContent)
    } else {
        fs.writeFileSync(path.join(componentDir, `${name}.tsx`), componentContent)
    }

    console.log(chalk.green(`Component ${name} created successfully!`))

}