// Declare a client component
'use client'

import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

export interface FormField {
    id: string;
    name: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    required?: boolean;
};

interface AuthFormProps {
  title: string;
  fields: FormField[];
  buttonText: string;
  onSubmit: (data: Record<string, string>) => void;
  footerContent?: React.ReactNode;
};

const AuthForm = ({ title, fields, buttonText, onSubmit, footerContent }: AuthFormProps) => {

  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#848484]">{title}</h2>
      </div>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
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
          <Button type="submit">{buttonText}</Button>
        </div>
      </form>

      {footerContent}
    </div>
  );
};

export default AuthForm;