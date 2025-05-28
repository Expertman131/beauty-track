
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoleSelector from '@/components/auth/RoleSelector';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 beauty-gradient-text text-center">Вход в систему</h1>
            <p className="text-center text-beauty-700 mb-8">
              Выберите тип учетной записи для входа в BeautyTrack
            </p>
            
            <RoleSelector />
            
            <div className="mt-12 text-center">
              <p className="text-beauty-700">
                Еще нет учетной записи?{" "}
                <Link to="/register" className="text-beauty-500 hover:underline">
                  Зарегистрируйтесь
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
