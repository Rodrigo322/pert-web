import { Envelope, Eye, Lock, Password } from "@phosphor-icons/react";
import "./styles.css";
import { Link } from "react-router-dom";

export function Logon() {
  return (
    <div className="container-logon">
      <div className="logo">
        <span>Time</span>
        <span>Sheet</span>
      </div>
      <form>
        <header>
          <h1>Bem Vindo</h1>
          <h3>Entre na sua conta</h3>
        </header>
        <div className="inputs-group">
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

        <button type="submit">Entrar</button>
      </form>
      <div className="create-account">
        <p> Novo por aqui?</p>
        <Link to="/register">Crie sua conta</Link>
      </div>
      <div className="create-account">
        <p> Esqueceu sua senha?</p>
        <Link to="#">Clique aqui.</Link>
      </div>
    </div>
  );
}
