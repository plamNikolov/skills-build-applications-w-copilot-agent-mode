// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        error: {
            status,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
};
// 404 Not Found middleware
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: {
            status: 404,
            message: `Route ${req.method} ${req.path} not found`,
        },
    });
};
// CORS configuration
export const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
        ];
        // Allow Codespaces URLs
        if (process.env.CODESPACE_NAME) {
            allowedOrigins.push(`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`);
        }
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
// Request logging middleware
export const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });
    next();
};
// Async route handler wrapper
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};
