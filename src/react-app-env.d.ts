declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_S3_BUCKET_NAME: string
            REACT_APP_S3_BUCKET_REGION: string
            REACT_APP_AWS_ACCESS_KEY_ID: string
            REACT_APP_AWS_SECRET_ACCESS_KEY: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
