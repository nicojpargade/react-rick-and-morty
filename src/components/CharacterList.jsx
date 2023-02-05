import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage(props) {
    return (
        <header className="d-flex justify-content-between align-items-center">
            {props.page > 1 ? (
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                        props.setPage(
                            props.page > 1 ? props.page - 1 : props.page
                        );
                    }}
                >
                    Previous page
                </button>
            ) : (
                <div></div>
            )}

            {props.page < 42 ? (
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                        props.setPage(
                            props.page < 42 ? props.page + 1 : props.page
                        );
                    }}
                >
                    Next page
                </button>
            ) : (
                <div></div>
            )}
        </header>
    );
}

function CharacterList() {
    const [character, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `https://rickandmortyapi.com/api/character?page=${page}`
            );
            const data = await response.json();
            setLoading(false);
            setCharacter(data.results);
        }

        fetchData();
    }, [page]);

    return (
        <div className="container">
            <NavPage page={page} setPage={setPage} />

            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="row">
                    {character.map((character) => {
                        return (
                            <div className="col-md-4" key={character.id}>
                                <Character character={character} />
                            </div>
                        );
                    })}
                </div>
            )}
            <NavPage page={page} setPage={setPage} />
        </div>
    );
}

export default CharacterList;
