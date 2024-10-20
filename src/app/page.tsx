"use client";

import { AuthenticationRequest, AuthenticationResponse } from "@/models/authentication";
import AuthenticationService from "@/services/api/authentication.service";
import { LocalStorageService } from "@/services/localstorage/local-storage.service";
import { LOCAL_USER_KEY } from "@/utils/constants/local-storage.constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState<AuthenticationRequest>({
        email: "",
        password: "",
    });

    function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.target;
        setLoginData({ ...loginData, [id]: value });
    }

    function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        AuthenticationService.login(loginData)
            .then((response) => {
                if (response.ok) return response.json();
            })
            .then((userData?: AuthenticationResponse) => {
                if (userData) {
                    LocalStorageService.saveItem(LOCAL_USER_KEY, userData);
                    switch(userData.role){
                        case "ADMIN":
                        case "USER":
                        case "PROFESSOR":
                        case "MONITOR":
                            router.push("/home")
                    }
                }
            });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-opacity-70 border border-gray-300 rounded-lg shadow-md bg-lime-500 dark:bg-teal-950 ">
                <div className="px-6 py-4">
                    <h3 className="mt-3 text-xl font-medium text-center text-gray-900 dark:text-gray-200">
                        SalasInfo
                    </h3>

                    <p className="mt-1 text-center dark:text-white">
                        Inicia sesión o crea una cuenta
                    </p>

                    <form onSubmit={handleSubmitForm}>
                        <div className="w-full mt-4">
                            <input
                                id="email"
                                className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="email"
                                placeholder="Correo electrónico"
                                aria-label="Email Address"
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="w-full mt-4">
                            <input
                                id="password"
                                className="block w-full px-4 py-2 mt-2 placeholder-gray-400  backdrop-blur-lg border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="password"
                                placeholder="Contraseña"
                                aria-label="Password"
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <a
                                href="#"
                                className="text-sm text-gray-700 dark:text-gray-200 hover:text-gray-500"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>

                            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm dark:text-gray-200">
                        ¿No tienes una cuenta?{" "}
                    </span>

                    <Link
                        href="/register"
                        className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Regístrate
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
