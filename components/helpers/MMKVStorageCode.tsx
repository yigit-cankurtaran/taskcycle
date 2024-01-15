// import storage from "../Storage";
// change the import in case you end up using this

// useEffect(() => {
//   const fetchTasks = () => {
//     try {
//       const storedTasks = storage.getString("tasks");
//       if (storedTasks !== null && storedTasks !== undefined) {
//         setTasks(JSON.parse(storedTasks));
//       }
//       setTasksFetched(true);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const fetchCurrentTaskId = () => {
//     try {
//       const storedCurrentTaskId = storage.getString("currentTaskId");
//       if (storedCurrentTaskId !== null && storedCurrentTaskId !== undefined) {
//         setCurrentTaskId(JSON.parse(storedCurrentTaskId));
//         console.log("Current task id fetched:", currentTaskId);
//       }
//       setCurrentTaskIdFetched(true);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   fetchTasks();
//   fetchCurrentTaskId();
// }, []);

// ^^ MMKV storage, not supported in expo go
// will uncomment if i make a dev client
