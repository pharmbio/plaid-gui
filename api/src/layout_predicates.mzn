include "globals.mzn";

predicate sorted_except_0(array[int] of var int: x, int: num, int: min, int: max) = 
  % Possibly only the regular constraint is needed
  forall(i in 1..length(x)-1)(x[i]<=x[i+1] \/ x[i+1]==0) /\
  regular(x, concat(["(0* \(i)){\(min),\(max)} " | i in 1..num]++["0*"]))::domain;
  
  
%% Cost implied constraints, similar to the ones derived for a group automaton constraint  
predicate my_implied_cost(var int:cost, array[int] of var int: x) = 
  let {
    int: L = length(x);
    array[1..L] of var int: c_cost;
  } in
  c_cost[1] = x[1] /\
  c_cost[2] <= 1 /\
  c_cost[L] = cost /\
  forall(i in 1..L-1)(x[i+1] = c_cost[i+1] - c_cost[i] ) /\
  forall(i in 1..L-1)(c_cost[i+1] = x[i+1] + c_cost[i] ) /\
  forall(i in 1..L-1)(c_cost[i] <= c_cost[i+1]) /\
  forall(i in 2..L-1)(c_cost[i+1] <= 1 + c_cost[i-1]) /\
  forall(i in 2..L-1)(c_cost[i+1] - 1 <= c_cost[i-1]);


%% Cost implied constraints, similar to the ones derived for a group automaton constraint
predicate my_implied_cost_ext(var int:cost, array[int] of var int: x) = 
  let {
    int: L = length(x);
    array[1..L] of var int: c_cost;
  } in
  c_cost[1] = x[1] /\
  c_cost[2] <= 1 /\
  c_cost[L] = cost /\
  forall(i in 1..L-1)(x[i+1] = c_cost[i+1] - c_cost[i] ) /\
  forall(i in 1..L-1)(c_cost[i+1] = x[i+1] + c_cost[i] ) /\
  forall(i in 1..L-1)(c_cost[i] <= c_cost[i+1]) /\
  forall(i in 2..L-2)(c_cost[i+2] <= 1 + c_cost[i-1]) /\
  forall(i in 2..L-2)(c_cost[i+2] - 1 <= c_cost[i-1]);
  



predicate balanced_alldifferent(array[int] of var int: x, int: mid_val, int: mid_count) =
  let {
    int: L = length(x);
    array[1..2,1..L] of var int: x_split;
  } in
  forall(i in 1..L)(if x[i] <= mid_val then x_split[1,i]==x[i] /\ x_split[2,i]==0  else x_split[1,i]==0 /\ x_split[2,i]==x[i] endif ) /\
  alldifferent_except_0(x_split[1,..]) /\ alldifferent_except_0(x_split[2,..]) /\
  count(i in 1..L)(x_split[1,i]>0 /\ x_split[1,i]<=mid_val) >= mid_count /\
  count(i in 1..L)(x_split[2,i]>mid_val) >= mid_count /\ nvalue(mid_count+1, x_split[1,..]) /\ nvalue(mid_count+1, x_split[2,..]);


%  nvalue(mid_count+1, x_split[1,..]) /\
%  nvalue(mid_count+1, x_split[2,..]);