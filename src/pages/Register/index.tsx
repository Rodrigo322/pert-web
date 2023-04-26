import { Envelope, Eye, EyeClosed, Lock, User } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, useState } from "react";

import "./styles.css";
import { api } from "../../services/api";

interface FormValues {
  [key: string]: string;
}

export function Register() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({});

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormValues((prevValues) => ({ ...prevValues, [fieldName]: fieldValue }));
  };

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    const response = await api.post("/create-user", {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });

    if (response.status === 201) {
      alert("Usuário criado com sucesso!");
    } else {
      alert("Ops! Algo deu errado. Tente novamente!");
    }
  }

  return (
    <div className="container-logon">
      <div className="logo">
        <span>Time</span>
        <span>Sheet</span>
      </div>
      <form onSubmit={handleCreateUser}>
        <header>
          <h1>Cadastro</h1>
        </header>
        <div className="inputs-group">
          <div className="input-icon">
            <User color="#c4d4e3" size={25} />
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              value={formValues.name}
              onChange={handleChangeValues}
            />
          </div>

          <div className="input-icon">
            <Envelope color="#c4d4e3" size={25} />
            <input
              name="email"
              value={formValues.email}
              onChange={handleChangeValues}
              type="email"
              placeholder="Seu e-mail"
            />
          </div>

          <div className="input-icon">
            <Lock color="#c4d4e3" size={25} />
            <input
              name="password"
              value={formValues.password}
              onChange={handleChangeValues}
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Sua senha"
            />

            {isVisiblePassword && (
              <Eye
                onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                color="#c4d4e3"
                size={25}
              />
            )}
            {!isVisiblePassword && (
              <EyeClosed
                onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                color="#c4d4e3"
                size={25}
              />
            )}
          </div>
        </div>

        <button type="submit">Criar conta</button>
      </form>
    </div>
  );
}
