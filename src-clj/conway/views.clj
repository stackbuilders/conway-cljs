(ns conway.views
  (:require
    [hiccup
      [page :refer [html5]]
      [page :refer [include-js]]]))

(defn square-board 
  [size] 
  (vec (into [:table] 
             (replicate size (vec 
                              (into [:tr] (replicate size [:td "&nbsp;"])))))))

(defn index-page []
  (html5
    [:head
     [:style "td{ width: 20px; }"]
     [:title "Conway"]
     (include-js "/js/main.js")]
    [:body
      [:h1 "Conway"]
     (square-board 10)]))
