// lib/env.ts

export const env = {
    get DATABASE_URL(): string {
        const url = process.env.DATABASE_URL;
        if (!url) {
            console.error(
                "\n❌ MISSING ENVIRONMENT VARIABLE: DATABASE_URL" +
                "\n   Please configure 'DATABASE_URL' in your .env.local file." +
                "\n   Example: DATABASE_URL=\"file:./dev.db\"\n"
            );
            throw new Error("Missing DATABASE_URL in .env.local. Please configure it.");
        }
        return url;
    },

    get JWT_SECRET(): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error(
                "\n❌ MISSING ENVIRONMENT VARIABLE: JWT_SECRET" +
                "\n   Please configure 'JWT_SECRET' in your .env.local file." +
                "\n   Example: JWT_SECRET=\"your_super_secret_key_123\"\n"
            );
            throw new Error("Missing JWT_SECRET in .env.local");
        }
        return secret;
    },

    validate(): void {
        try {
            this.DATABASE_URL;
            this.JWT_SECRET;
            console.log("✅ Environment configuration loaded successfully.");
        } catch (error) {
            console.error("❌ Environment configuration failed. See errors above.");
        }
    }
};
