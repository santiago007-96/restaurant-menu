import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";


export const Navigation = () => {

  return (
    <BrowserRouter>
      <Routes>
        {
          map( routes, ( route, index ) => (
            <Route
              key={ index }
              path={ route.path }
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          ))
        }
      </Routes>
    </BrowserRouter>
  );
}
