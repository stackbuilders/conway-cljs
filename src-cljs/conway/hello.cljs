(ns conway.hello)

(defn cell
  "Returns the cell at the given coordinates"
  [x y]
  (.item (.-cells (.item (.getElementsByTagName js/document "tr") x)) y))

(defn table-size []
  (.-length (.getElementsByTagName js/document "tr")))

(defn get-cell-value [x y]
  (if (= (.-bgColor (cell x y)) "blue")
    1
    0))

(defn set-cell-value [x y value]
  (let [color (if (= 0 value) "white" "blue")]
    (set! (.-bgColor (cell x y)) color)))

(defn num-alive [nbs]
  (reduce + 0 nbs))

(defn valid-coords [board x y]
  (filter #(and (>= (first %) 0)
                (>= (last %) 0)
                (>= (- (count board) 1) (first %))
                (>= (- (count board) 1) (last %)))
          (map #(vector (+ (first %) x) (+ (last %) y))
               [[-1 -1] [-1 1] [1 -1] [1 1] [0 1] [1 0] [-1 0] [0 -1]])))

(defn apply-state [state]
  (doseq [x (range 0 (count state)) y (range 0 (count state))]
    (set-cell-value x y (get-in state [x y]))))

(defn nabes [state x y]
  (map #(get-in state [(first %) (last %)]) (valid-coords state x y)))

(defn initialize-board [n f]
  (vec (for [x (range 0 n)]
    (vec (for [y (range 0 n)] (f x y))))))

(defn random-board [n]
  (initialize-board n (fn [x y] (rand-int 2) )))

(defn zero-board [n]
  (initialize-board n (constantly 0)))

(defn current-board []
  (initialize-board (table-size) (fn [x y] (get-cell-value x y))))

(defn alive-cell-next-state
  [alive-nabes]
  (cond (> 2 alive-nabes) 0
        (= 2 alive-nabes) 1
        (= 3 alive-nabes) 1
        (< 3 alive-nabes) 0))

(defn next-state-for [state x y]
  (let [alive-cnt (num-alive (nabes state x y))]
    (if (= (get-in state [x y]) 1)
      (alive-cell-next-state alive-cnt)
      (if (= alive-cnt 3)
        1
        0))))

(defn next-tick [current-state]
  (initialize-board (count current-state) (partial next-state-for current-state)))

(defn tick []
  (apply-state (next-tick (current-board))))

(defn pb [board]
  (doseq [row board] (prn row)))

(defn setup []
  (apply-state (random-board (table-size)))
  (.setInterval js/window "conway.hello.tick()" 500))

;; Run this function when the window has loaded
(set! (.-onload js/window) setup)
