import { Button } from '@/components/ui/button';
import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <div>
            <h1>Welcome To Happy Tails Shelter!</h1>
            <p>this is our empty landing page</p>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/login'}>
                Go to Login Page
            </Button>
        </div>
    );
};

export default LandingPage;