import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemActions } from "./Store/ItemsSlice";
import { FetchActions } from "./Store/FetchLoaderStatus";

const FetchItems = () => {
  const FetchStatus = useSelector((store) => store.FetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    // Exit if data has already been fetched to prevent redundant calls
    if (FetchStatus.FetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(FetchActions.MarkFetchingStarted());

    // Connect to your Express backend (app.js) on port 8080
    fetch("http://localhost:8080/items", { signal })
      .then((res) => res.json())
      .then((data) => {
        /* 
           MongoDB Atlas will return an array of items. 
           We check if the backend wraps them in an 'items' key or sends the array directly.
        */
        const itemsToLoad = data.items ? data.items : data;

        dispatch(FetchActions.MarkFetchDone());
        dispatch(FetchActions.MarkFetchingFinished());
        
        // Pass the full array of items from the database to Redux
        dispatch(ItemActions.AddInitialItems(itemsToLoad));
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch cleanup: request aborted');
        } else {
          console.error('Database fetch error:', err);
          dispatch(FetchActions.MarkFetchingFinished());
        }
      });

    return () => {
      controller.abort();
    };
    // Dependency on FetchDone prevents infinite loops while allowing the initial fetch
  }, [FetchStatus.FetchDone, dispatch]);

  return null;
};

export default FetchItems;