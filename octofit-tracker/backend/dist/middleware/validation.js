export const validateRequest = (rules) => {
    return (req, res, next) => {
        const errors = {};
        for (const rule of rules) {
            const value = req.body[rule.field];
            // Check required
            if (rule.required && (value === undefined || value === null || value === '')) {
                errors[rule.field] = `${rule.field} is required`;
                continue;
            }
            if (value === undefined || value === null || value === '') {
                continue;
            }
            // Check type
            if (rule.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    errors[rule.field] = `${rule.field} must be a valid email`;
                }
            }
            else if (typeof value !== rule.type) {
                errors[rule.field] = `${rule.field} must be of type ${rule.type}`;
                continue;
            }
            // Check string constraints
            if (rule.type === 'string') {
                if (rule.minLength && value.length < rule.minLength) {
                    errors[rule.field] = `${rule.field} must be at least ${rule.minLength} characters`;
                }
                if (rule.maxLength && value.length > rule.maxLength) {
                    errors[rule.field] = `${rule.field} must be at most ${rule.maxLength} characters`;
                }
                if (rule.pattern && !rule.pattern.test(value)) {
                    errors[rule.field] = `${rule.field} does not match the required format`;
                }
            }
            // Check number constraints
            if (rule.type === 'number') {
                if (rule.min !== undefined && value < rule.min) {
                    errors[rule.field] = `${rule.field} must be at least ${rule.min}`;
                }
                if (rule.max !== undefined && value > rule.max) {
                    errors[rule.field] = `${rule.field} must be at most ${rule.max}`;
                }
            }
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                error: {
                    status: 400,
                    message: 'Validation failed',
                    details: errors,
                },
            });
        }
        next();
    };
};
