// Declare a client component
'use client'

import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { loginUser, registerUser } from "@/utils/api/auth";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export interface FormField {
    id: string;
    name: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    required?: boolean;
};

interface AuthFormProps {
  type: 'login' | 'register';
  title: string;
  fields: FormField[];
  buttonText: string;
  footerContent?: React.ReactNode;
};

const AuthForm = ({type, title, fields, buttonText, footerContent }: AuthFormProps) => {

  const {login} = useAuth();
  const initialState: Record<string, string> = {};

  for (const field of fields) {
    initialState[field.name] = '';
  }


  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try{
      const apiField = {
        login: loginUser,
        register: registerUser,
      };

      const apiRequest = apiField[type];
      const responce = await apiRequest(formData);

      console.log('resquest successful', responce.data)
      login(responce.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Error:', err.response?.data);

        const errorData = err.response?.data;
        if (errorData) {
          const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${(value as string[]).join(', ')}`)
          .join('; ');
          setError(errorMessage);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        setError('Something went wrong.');
        console.error('Unknown error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#848484]">{title}</h2>
      </div>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 
        text-sm text-center bg-red-100 p-2 rounded">{error}</p>}
        
        {fields.map((field) => (
          <InputField
            key={field.id}
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <div className="pt-2">
          <Button type="submit" disabled= {loading}>
            {loading ? 'Loading...' : buttonText}
          </Button>
        </div>
      </form>

      {footerContent}
    </div>
  );
};

export default AuthForm;