import {
  Circuitry,
  GithubLogo,
  LinkedinLogo,
  PencilLine,
  Trash,
  YoutubeLogo,
} from "@phosphor-icons/react";
import "./styles.css";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";

interface IData {
  id: string;
  title: string;
  description: string;
  optimistic: number;
  nominal: number;
  pessimistic: number;
  unitTime: string;
  estimated: number;
}

export function Home() {
  const [isList, setIsList] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unitTime, setUnitTime] = useState("");
  const [optimistic, setOptimistic] = useState(0);
  const [nominal, setNominal] = useState(0);
  const [pessimistic, setPessimistic] = useState(0);
  const [myData, setMyData] = useState<IData[]>([]);

  const date = new Date();
  const currentYear = date.getFullYear();

  useEffect(() => {
    api.get("get-perts").then((response) => {
      setMyData(response.data);
    });
  }, []);

  function createPert(e: FormEvent) {
    e.preventDefault();
    api
      .post("/create-pert/clgk04fsi00001a5g2tv5nvje", {
        title,
        description,
        unitTime,
        optimistic,
        nominal,
        pessimistic,
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setUnitTime("");
        setOptimistic(0);
        setNominal(0);
        setPessimistic(0);
        setMyData([...myData, response.data]);
        setIsList(false);
        alert("Estimativa criada com sucesso!");
      });
  }

  async function deletePert(id: string) {
    const response = await api.delete(`delete-pert/${id}`);

    const newMyData = myData.filter((id) => id !== id);
    setMyData(newMyData);

    console.log(newMyData);
  }

  return (
    <div className="home">
      <div className="container">
        <header className="header">
          <h1>Minhas estimativas</h1>

          {isList ? (
            <a onClick={() => setIsList(!isList)}>
              Visualizar minhas estivativas
            </a>
          ) : (
            <a onClick={() => setIsList(!isList)}>Criar Nova Estimativa</a>
          )}
        </header>

        {!isList && (
          <main className="content">
            {myData?.map((data) => (
              <div key={data.id} className="card">
                <div className="card-header">
                  <div>
                    <Circuitry color="#C4D4E3" size={32} />
                    <h1>{data.title}</h1>
                  </div>

                  <div>
                    <PencilLine color="#C4D4E3" size={32} />

                    <Trash
                      onClick={() => deletePert(data.id)}
                      color="#C4D4E3"
                      size={32}
                    />
                  </div>
                </div>
                <p>{data.description}</p>
                <footer className="card-footer">
                  <p>
                    Estimativa: {data.estimated.toFixed(2)} {data.unitTime}
                  </p>
                </footer>
              </div>
            ))}
          </main>
        )}
        {isList && (
          <form>
            <div className="input-group">
              <label htmlFor="title">Titulo da atividade</label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="input-group">
              <label htmlFor="title">Descrição da atividade</label>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className="input-group">
              <label htmlFor="title">Unidade de Tempo</label>
              <select
                value={unitTime}
                onChange={(e) => setUnitTime(e.target.value)}
              >
                <option value="HORAS">Horas</option>
                <option value="DIAS">Dias</option>
                <option value="MESES">Meses</option>
              </select>
            </div>

            <div className="inputs-groups">
              <div className="input-group">
                <label htmlFor="title">Estimativa Otimista</label>
                <input
                  type="number"
                  onChange={(e) => setOptimistic(parseInt(e.target.value))}
                  value={optimistic}
                />
              </div>

              <div className="input-group">
                <label htmlFor="title">Estimativa Nominal</label>
                <input
                  type="number"
                  onChange={(e) => setNominal(parseInt(e.target.value))}
                  value={nominal}
                />
              </div>

              <div className="input-group">
                <label htmlFor="title">Estimativa Pessimista</label>
                <input
                  type="number"
                  onChange={(e) => setPessimistic(parseInt(e.target.value))}
                  value={pessimistic}
                />
              </div>
            </div>

            <div className="input-group">
              <button onClick={createPert}>Calcular estimativa</button>
            </div>
          </form>
        )}
      </div>
      <footer className="bottom-footer">
        <main>
          <a
            href="https://www.linkedin.com/in/rodrigolucas322/"
            target="_blank"
          >
            <LinkedinLogo color="#c4d4e3" size={32} />
          </a>
          <a target="_blank" href="https://github.com/Rodrigo322">
            <GithubLogo color="#c4d4e3" size={32} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCd70qIQEo_ugf1NMuHRSu5A"
            target="_blank"
          >
            <YoutubeLogo color="#c4d4e3" size={32} />
          </a>
        </main>
        <div>
          <p>&copy; {currentYear}</p>
        </div>
      </footer>
    </div>
  );
}
