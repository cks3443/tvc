import { useEffect, useState, useRef } from "react";
import FirebaseFirestoreService from "./FirebaseFiresotreService";
import { loginWithGoogle, logout } from "./FirebaseAuthService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [addState, setAddState] = useState(false);
  const [exerciseState, setExerciseState] = useState(true);
  const [english, setEnglish] = useState("");
  const [korean, setKorean] = useState("");
  const [login, setLogin] = useState(false);
  const [page, setPage] = useState(0);
  const [vocas, setVocas] = useState([]);
  const [showHint, setShowHint] = useState(true);
  const [inp, setInp] = useState("");

  useEffect(async () => {
    const vc = await FirebaseFirestoreService.readAllDocument("voca");
    if (vc.length != 0) {
      setVocas([...vc]);
    }
  }, []);

  useEffect(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      }
    });
  }, []);

  useEffect(() => {
    if ((exerciseState, vocas.length != 0)) {
      setEnglish(vocas[page].english);
      setKorean(vocas[page].korean);
    }
  }, [page]);

  const nextBtnHandler = () => {
    setPage((prev) => {
      if (prev + 1 < vocas.length) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevKeyPress = () => {
    setPage((prev) => {
      if (0 <= prev - 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const addBtnHandler = (e) => {
    e.preventDefault();

    setAddState(true);

    setExerciseState(false);
  };

  const exerciseBtnHandler = (e) => {
    e.preventDefault();

    setExerciseState(true);

    setAddState(false);
  };

  const plusBtnHandler = async () => {
    try {
      if (addState && english != "" && korean != "") {
        const res = await FirebaseFirestoreService.createDocument("voca", {
          english,
          korean,
        });
        setEnglish("");
        setKorean("");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLoginWithGoogle = () => {
    try {
      loginWithGoogle().then((r) => {
        setLogin(true);
      });
    } catch (error) {
      alert(console.message);
    }
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        setLogin(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleKeyPress = async (e) => {
    if (e.key == "Enter") {
      setShowHint((prev) => !prev);
    } else if (e.key == "]") {
      nextBtnHandler();
      setTimeout(() => setInp(""), 50);
    } else if (e.key == "[") {
      handlePrevKeyPress();
      setTimeout(() => setInp(""), 50);
    }
  };

  return (
    <div
      className='flex flex-col items-center min-w-full mt-32'
      onKeyPress={handleKeyPress}>
      {!login ? (
        <button
          class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={handleLoginWithGoogle}>
          Google Login
        </button>
      ) : (
        <>
          <div className='flex flex-row'>
            <button
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              onClick={(e) => {
                addBtnHandler(e);
              }}>
              Edit
            </button>
            <button
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-4 mr-4'
              onClick={(e) => exerciseBtnHandler(e)}>
              Exercise
            </button>
            <button
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              onClick={handleLogout}>
              Logout
            </button>
          </div>
          <input
            className='border border-gray-500 w-10/12 h-12 rounded text-2xl mt-4 px-4'
            readOnly={!addState}
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder='english'
            hidden={exerciseState && showHint}
          />
          <input
            className='border border-gray-500 w-10/12 mt-5 h-12 rounded text-2xl px-4'
            value={korean}
            onChange={(e) => setKorean(e.target.value)}
            placeholder='korean'
            readOnly={exerciseState}
          />
          <input
            className='border border-blue-300 w-10/12 mt-5 h-12 rounded text-2xl px-4'
            hidden={!exerciseState}
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />

          <button
            className='w-14 text-2xl h-14 mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center'
            onClick={() => {
              if (addState) {
                plusBtnHandler();
              } else {
                nextBtnHandler();
              }
            }}>
            {addState && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
            )}

            {exerciseState && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            )}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
