export function loadConfig() {
    const codespaceName = process.env.CODESPACE_NAME;
    const nodeEnv = process.env.NODE_ENV || 'development';
    const port = parseInt(process.env.PORT || '8000', 10);
    let baseUrl;
    if (codespaceName) {
        // GitHub Codespaces URL format
        baseUrl = `https://${codespaceName}-8000.app.github.dev`;
    }
    else if (process.env.BASE_URL) {
        baseUrl = process.env.BASE_URL;
    }
    else {
        baseUrl = `http://localhost:${port}`;
    }
    const corsOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
    ];
    if (codespaceName) {
        corsOrigins.push(`https://${codespaceName}-5173.app.github.dev`);
    }
    const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    return {
        port,
        nodeEnv,
        mongoDbUri,
        baseUrl,
        corsOrigins,
    };
}
export const config = loadConfig();
export default config;
