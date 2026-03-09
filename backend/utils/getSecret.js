import fs from 'fs'

export const getSecret = (secretName) => {
    const secretPath = `/run/secrets/${secretName}`
    try {
        if (fs.existsSync(secretPath)) {
            return fs.readFileSync(secretPath, 'utf-8')
        } else {
            throw new Error
        }
    } catch (error) {
        console.log(`secret ${secretName} not found`)
    }
}

export const getSecretAsync = async (secretName) => {
    const secretPath = `/run/secrets/${secretName}`
    try {
        const secret = fs.readFile(secretPath)
        return secret
    } catch (error) {
        console.log(`secret ${secretName} not found`)
    }
}
