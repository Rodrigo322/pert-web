import { Envelope, Eye, Lock, User } from "@phosphor-icons/react";
import "./styles.css";

export function Register() {
  return (
    <div className="container-logon">
      <div className="logo">
        <span>Time</span>
        <span>Sheet</span>
      </div>
      <form>
        <header>
          <h1>Cadastro</h1>
        </header>
        <div className="inputs-group">
          <div className="input-icon">
            <User color="#c4d4e3" size={25} />
            <input type="text" placeholder="Seu nome de usuário" />
          </div>

          <div className="input-icon">
            <Envelope color="#c4d4e3" size={25} />
            <input type="text" placeholder="Seu e-mail" />
          </div>

          <div className="input-icon">
            <Lock color="#c4d4e3" size={25} />
            <input type="text" placeholder="Sua senha" />
            <Eye color="#c4d4e3" size={25} />
          </div>
        </div>

        <button type="submit">Criar conta</button>
      </form>
    </div>
  );
}
