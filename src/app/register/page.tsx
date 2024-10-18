"use client";

import { RegisterResponse } from "@/models/authentication";
import AuthenticationService from "@/services/api/authentication.service";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
};

const Page = () => {
    const [formData, setFormData] = useState<FormData>({});

    function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    }

    function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formData.password !== formData.confirmedPassword) return;
        AuthenticationService.register(formData)
            .then((response) => {
                if (response.ok) return response.json();
            })
            .then((data: RegisterResponse) => alert(data.message));
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <section className="bg-lime-500 dark:bg-teal-950 bg-opacity-70 rounded-lg shadow-md border border-gray-300">
                <div className="container flex items-center justify-center px-6 mx-auto mt-8 mb-8">
                    <form className="w-full max-w-md" onSubmit={handleSubmitForm}>
                        <h3 className="mt-3 text-xl font-medium text-center text-gray-900 dark:text-gray-200">
                            Registro
                        </h3>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>

                            <input
                                id="firstname"
                                type="text"
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Nombre"
                                onInput={handleChangeInput}
                            />
                        </div>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>

                            <input
                                id="lastname"
                                type="text"
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Apellidos"
                                onInput={handleChangeInput}
                            />
                        </div>

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>

                            <input
                                id="email"
                                type="email"
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Correo electrónico"
                                onInput={handleChangeInput}
                            />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </span>

                            <input
                                id="password"
                                type="password"
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Contraseña"
                                onInput={handleChangeInput}
                            />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </span>

                            <input
                                id="confirmedPassword"
                                type="password"
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Confirmar contraseña"
                                onInput={handleChangeInput}
                            />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Registrarse
                            </button>

                            <div className="mt-6 text-center ">
                                <Link
                                    href="/"
                                    className="text-sm text-blue-500 hover:underline dark:text-blue-400 font-bold"
                                >
                                    ¿Ya tienes una cuenta?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Page;
