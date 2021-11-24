(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[36],{1401:function(t,e,a){"use strict";a.r(e);var n=a(24),c=a(398),s=a(414),i=a(412),r=a(399),o=a(659),l=a(0),d=a(660),u=a(1295),h=a(1400),m=a(323),p=a(372),j=a.n(p),b=a(382),y=a.n(b),f=a(49),O=a.n(f),x=a(328),g=a(6),_=y()(j.a),w=function(t){var e=t.plans;return Object(g.jsx)(l.Fragment,{children:e.map((function(t,a){return Object(g.jsx)(d.a,{md:"3",sm:"12",children:Object(g.jsxs)(c.a,{className:"plan-card border-primary",children:[Object(g.jsxs)(s.a,{className:"d-flex justify-content-between align-items-center pt-75 pb-1",children:[Object(g.jsx)("h2",{className:"mb-0",children:"Rs ".concat(t.price)}),Object(g.jsx)(u.a,{id:"plan-expiry-date",color:"light-secondary",children:"".concat(t.validity," days")}),Object(g.jsx)(h.a,{placement:"top",target:"plan-expiry-date",children:"Validity (in days)"})]}),Object(g.jsxs)(r.a,{children:[Object(g.jsx)("ul",{className:"list-unstyled my-1 mb-5",children:Object(g.jsx)("li",{className:"my-25",children:Object(g.jsxs)("span",{className:"align-middle",children:[Object(g.jsx)("strong",{children:"Daily Income:"})," ",t.daily_income," Rs/Day"]})})}),Object(g.jsx)(m.a.Ripple,{className:"text-center",onClick:function(){return function(t){var a=JSON.parse(localStorage.getItem("userData")),n={member_id:a.id,plan_id:t},c=e.filter((function(e){return e.plan_id===t}))[0];_.fire({title:"Are you sure to purchase this plan?",text:"The amount will be deducted from your fund account",icon:"info",showCancelButton:"No, Cancel",confirmButtonText:"Yes",customClass:{cancelButton:"ml-2 btn btn-danger",confirmButton:"btn btn-primary"},buttonsStyling:!1}).then((function(t){t.isConfirmed&&O.a.post(x.a.routes.post.purchase_plan,n,x.a.auth).then((function(t){!0===t.data.success&&_.fire({title:"Congratulations!",text:"Package Rs ".concat(c.price," purchased successfully \n Username: [").concat(a.username,"] activated successfully"),icon:"success",confirmButtonText:"OK",customClass:{confirmButton:"mr-1 btn btn-primary"},buttonsStyling:!1}).then((function(){window.location.reload()})),!1===t.data.success&&j.a.fire("Plan purchase failed!",t.data.message,"error")})),t.isDismissed||t.isDenied}))}(t.plan_id)},color:"primary",block:!0,children:"Select Plan"})]})]},a)},a)}))})},v=function(t){var e=t.plan;return Object(g.jsxs)(c.a,{className:"col-md-4 bg-primary text-white",children:[Object(g.jsxs)(s.a,{className:" d-flex justify-content-between align-items-center pt-75 pb-1",children:[Object(g.jsx)("h4",{className:"mb-0 text-white font-weight-bold",children:"Current Plan"}),Object(g.jsxs)(u.a,{id:"plan-expiry-date",color:"light-primary",className:"bg-white",children:["Valid till: ",e.validity]}),Object(g.jsx)(h.a,{placement:"top",target:"plan-expiry-date",children:"Expiry Date"})]}),Object(g.jsx)(r.a,{children:Object(g.jsxs)("ul",{className:"list-unstyled my-1",children:[Object(g.jsx)("li",{children:Object(g.jsxs)("span",{className:"h4 align-middle font-weight-bold text-white",children:[" Rs ",e.price]})}),Object(g.jsx)("li",{className:"my-25",children:Object(g.jsxs)("span",{className:"align-middle",children:[Object(g.jsx)("strong",{children:"Joining:"})," ",e.joining]})}),Object(g.jsx)("li",{className:"my-25",children:Object(g.jsxs)("span",{className:"align-middle",children:[Object(g.jsx)("strong",{children:"Daily Income:"})," ",e.daily_income," Rs/Day"]})}),Object(g.jsx)("li",{children:Object(g.jsxs)("span",{className:"align-middle",children:[Object(g.jsx)("strong",{children:"Withdraw Limit:"})," Rs ",e.withdraw_limit]})})]})})]})},N=(a(1090),y()(j.a));e.default=function(){var t=Object(l.useState)([]),e=Object(n.a)(t,2),a=e[0],d=e[1],u=Object(l.useState)([]),h=Object(n.a)(u,2),m=h[0],p=h[1];return Object(l.useEffect)((function(){Object(x.c)();try{O.a.get(x.a.routes.get.plans,x.a.auth).then((function(t){d(t.data.data)})).catch((function(t){N.fire("Network Error","Kindly check your internet connection","error")})),O.a.get("".concat(x.a.routes.get.active_plan,"/").concat(Object(x.b)()),x.a.auth).then((function(t){t.data.success&&p(t.data.data)})).catch((function(t){j.a.fire("No plan active!","Kindly purchase any plan to get more services","info")}))}catch(t){N.fire("Invalid Request","Kindly relogin to fix this issue","error")}}),[]),Object(g.jsxs)(c.a,{className:"container",children:[Object(g.jsx)(s.a,{children:m&&m.validity&&Object(g.jsx)(i.a,{children:"Active"})}),Object(g.jsxs)(r.a,{className:"",children:[Object(g.jsx)(o.a,{children:m&&m.validity&&Object(g.jsx)(v,{plan:m})}),Object(g.jsx)(s.a,{children:Object(g.jsx)(i.a,{children:"All Plan"})}),Object(g.jsx)(o.a,{children:Object(g.jsx)(w,{plans:a})})]})]})}},328:function(t,e,a){"use strict";a.d(e,"c",(function(){return l})),a.d(e,"b",(function(){return d}));var n=a(339),c=a(49),s=a.n(c),i=(a(0),"https://api.cashmind.in/api/v1"),r=n.a.getToken(),o={header:{Authorization:"Bearer ".concat(r)},"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"},l=function(){try{s.a.get("".concat(i,"/profile"),o).then((function(t){return localStorage.setItem("userData",JSON.stringify(t.data.user)),!0}))}catch(t){console.log(t)}},d=function(){try{return JSON.parse(localStorage.getItem("userData")).id}catch(t){return""}},u={baseUrl:i,auth:o,headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"},auth_token:"".concat(r),routes:{post:{signup:"".concat(i,"/signup"),change_password:"".concat(i,"/change-password"),bank_account:"".concat(i,"/bank-account"),purchase_plan:"".concat(i,"/purchase-plan"),withdraw:"".concat(i,"/withdraw-fund"),transfer_fund:"".concat(i,"/fund-transfer"),initiate_payment:"".concat(i,"/initiate-payment"),complete_payment:"".concat(i,"/complete-payment")},get:{member_list:"".concat(i,"/member/list"),profile:"".concat(i,"/profile"),password_reset_link:"".concat(i,"/password-reset-link"),verify_password_link:"".concat(i,"/verify-password-link"),notifications:"".concat(i,"/notifications"),statistics:"".concat(i,"/statistics"),tree:"".concat(i,"/tree"),members_in_levels:"".concat(i,"/members-in-levels"),members_in_levels_count:"".concat(i,"/members-in-levels-count"),bank_account:"".concat(i,"/bank-account"),payment_options:"".concat(i,"/payment-options/").concat(d()),payment_qr:"".concat(i,"/payment-qr/").concat(d()),plans:"".concat(i,"/plans"),active_plan:"".concat(i,"/active-plan"),transactions_history:"".concat(i,"/transactions-history}"),fund_history:"".concat(i,"/fund-wallet-history"),withdrawal_history:"".concat(i,"/withdrawal-history"),level_income_history:"".concat(i,"/level-income-history"),daily_income_history:"".concat(i,"/daily-income-history"),direct_income_history:"".concat(i,"/direct-income-history"),reward_income_history:"".concat(i,"/reward-income-history")}}};e.a=u}}]);
//# sourceMappingURL=36.096ab8b4.chunk.js.map