import "../styles/Closed.css";
import { Link } from "react-router-dom";
function Closed() {
  return (
    <div>
      <div className="closed">
        <div className="clo-text">
          <h2>Доступ запрещён</h2>
          <p>
            Данную страницу могут просматривать только авторизованные
            пользователи
          </p>
          <div className="clo-btn">
            <Link to="/">
              <button className="home">
                <img src="/Group (2).svg" alt="" />
                На главную
              </button>
            </Link>
            <button className="refresh">Обновить</button>
          </div>
        </div>
        <div className="clo-img">
          <img src="/101-unlock 1.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Closed;
