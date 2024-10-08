import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/Input.jsx';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx';
import { Loader,User,Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore.js';
function SignUpPage() {

    // Correctly use useState with array destructuring
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate(); // Initialize navigate


	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent'>
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
                    <Input
                        icon={User}
                        type='text'
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type='email'
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                     <Input
                        icon={Lock}
                        type='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    <PasswordStrengthMeter password={password} />
                    <motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-sky-600
						hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
					>
						{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
					</motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-sky-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
        </motion.div>
    );
}

export default SignUpPage;
