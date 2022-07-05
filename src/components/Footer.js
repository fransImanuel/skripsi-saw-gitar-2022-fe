import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
    return(
        // <!-- Footer -->
        <footer className="text-center text-lg-start bg-light text-muted">
            <div className="text-center p-4" >
                This is Thesis Project Created by Frans Imanuel - 00000028631
            </div>
            <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                © 2022 Copyright:
                <a className="text-reset fw-bold" href="https://www.linkedin.com/in/frans-imanuel-567154190/">Frans Imanuel</a>
            </div>
        </footer>
    )
}