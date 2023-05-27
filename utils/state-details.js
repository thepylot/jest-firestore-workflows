module.exports = {
    isProduction: () => {
        return process.env.stage === "prod";
    },
    isDevelop: () => {
        return process.env.stage === "dev";
    },
    getDbUrl: () => {
        if (process.env.FIRESTORE_EMULATOR_HOST) {
            return process.env.FIRESTORE_EMULATOR_HOST
        } else {
            return process.env.stage === "prod"
            ? "https://{PROJECT_NAME_DEV}.firebaseio.com"
            : "https://{PROJECT_NAME_PROD}.firebaseio.com";
        }

    },
};