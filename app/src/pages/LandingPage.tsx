import { Button } from '@/components/ui/button';
import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Heading */}
                <h1 className="text-4xl text-primary font-bold mb-3">
                    Happy Tails
                </h1>
                <p className="text-gray-500 text-sm uppercase tracking-widest mb-2 font-medium">
                    Animal Shelter Management
                </p>

                {/* Divider */}
                <div className="w-12 h-1 rounded-full mx-auto my-4 bg-primary" />

                {/* Tagline */}
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                    Connecting animals with loving homes. Manage adoptions, fosters, and shelter care all in one place.
                </p>

                {/* Sign in Button */}
                <Button
                    size="lg"
                    onClick={() => window.location.href = '/login'}
                    className="w-full text-white font-semibold shadow-md hover:opacity-90 transition-opacity"
                >
                    Sign In to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default LandingPage;