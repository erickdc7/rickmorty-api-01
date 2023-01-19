import { useEffect, useState } from "react";
import Characters from "./components/Characters";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";

function App() {
	const [characters, setCharacters] = useState([]);
	const [info, setInfo] = useState({});

	const initialUrl = "https://rickandmortyapi.com/api/character";

	const fetchCharacters = (url) => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				//console.log(data);
				//console.log(data.results);
				//console.log(data.info);
				setCharacters(data.results);
				setInfo(data.info);
			})
			.catch(error => console.log(error))
	};

	useEffect(() => {
		fetchCharacters(initialUrl);
	}, [])

	const onPrevious = () => {
		fetchCharacters(info.prev);
	}

	const onNext = () => {
		fetchCharacters(info.next);
	}

	return (
		<>
			<Navbar brand="Rick & Morty APP" />
			<div className="container mt-5">
				<Pagination
					prev={info.prev}
					next={info.next}
					onPrevious={onPrevious}
					onNext={onNext}
				/>
				<Characters characters={characters} />
				<Pagination
					prev={info.prev}
					next={info.next}
					onPrevious={onPrevious}
					onNext={onNext}
				/>
			</div>
		</>
	);
}

export default App;
