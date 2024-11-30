"use client";
import React, { useState } from "react";

type User = {
  name: string;
  email: string;
  avatar: string;
};

type Reservation = {
  user: User;
  role: string;
};

const Role: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      user: {
        name: "Arthur Melo",
        email: "authurmelo@example.com",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1",
      },
      role: "Administrador/a",
    },
    {
      user: {
        name: "Andi Lane",
        email: "andi@example.com",
        avatar:
          "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1",
      },
      role: "Estudiante",
    },
    {
      user: {
        name: "Kate Morrison",
        email: "kate@example.com",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
      },
      role: "Docente",
    },
    {
      user: {
        name: "Candice Wu",
        email: "candice@example.com",
        avatar:
          "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3",
      },
      role: "Usuario",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  const handleRoleChange = (userEmail: string) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.user.email === userEmail
        ? { ...reservation, role: newRole }
        : reservation
    );
    setReservations(updatedReservations);
    setNewRole("");
    setSelectedUser(null);
  };

  return (
    <div>
      <section className="container px-4 mx-auto mt-8 mb-10">
        <h2 className="text-center text-lg mb-4 mt-4 font-bold">
          Gestión de roles de usuarios
        </h2>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="-my-2 overflow-x-auto">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-2 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                          Usuario
                        </th>
                        <th className="px-2 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                          Rol
                        </th>
                        <th className="px-2 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {reservations.map((reservation, index) => (
                        <tr key={index}>
                          <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-8 h-8 rounded-full"
                                src={reservation.user.avatar}
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                                  {reservation.user.name}
                                </h2>
                                <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                  {reservation.user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                            <div className="truncate">{reservation.role}</div>
                          </td>
                          <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center gap-x-2">
                              <select
                                value={
                                  selectedUser === reservation.user.email
                                    ? newRole
                                    : ""
                                }
                                onChange={(e) => {
                                  setNewRole(e.target.value);
                                  setSelectedUser(reservation.user.email);
                                }}
                                className="block w-40 px-2 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              >
                                <option value="">Seleccionar rol</option>
                                <option value="Administrador/a">
                                  Administrador/a
                                </option>
                                <option value="Estudiante">Estudiante</option>
                                <option value="Docente">Docente</option>
                                <option value="Usuario">Usuario</option>
                              </select>
                              <button
                                onClick={() =>
                                  handleRoleChange(reservation.user.email)
                                }
                                className="w-40 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                              >
                                Cambiar Rol
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Role;
