import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Next Keep API - Created by Swagger"
}

const ApiDocsLayout = ({ children }: { children: ReactNode }) => {
	return (
    <html>
        <body>
            {children}
        </body>
    </html>
    );
};

export default ApiDocsLayout;
