 (function(Q, X, w) {
    'use strict';

 function Qf(b, a, c, d, e) {
        function f(a, b, c) {
            var f = e.createElement("script"),
                n = null;
            f.type = "text/javascript";
            f.src = a;
            f.async = !0;
            n = function(a) { f.removeEventListener("load", n, !1);
                f.removeEventListener("error", n, !1);
                e.body.removeChild(f);
                f = null; var g = -1,
                    t = "unknown";
                a && ("load" !== a.type || d[b].called || (a = { type: "error" }), t = a.type, g = "error" === a.type ? 404 : 200);
                c && c(g, t) };
            f.addEventListener("load", n, !1);
            f.addEventListener("error", n, !1);
            e.body.appendChild(f);
            return n
        }
        return function(e, h, l, k, n, p, r, t) {
            function E() { q && q();
                z && z.abort() }

            function K(a, d, e, f, h) { A(s) && c.cancel(s);
                q = z = null;
                a(d, e, f, h);
                b.$$completeOutstandingRequest(y) } b.$$incOutstandingRequestCount();
            h = h || b.url();
            if ("jsonp" == F(e)) { var u = "_" + (d.counter++).toString(36);
                d[u] = function(a) { d[u].data = a;
                    d[u].called = !0 }; var q = f(h.replace("JSON_CALLBACK", "angular.callbacks"), u, function(a, b) { K(k, a, d[u].data, "", b);
                    d[u] = y }) } else {
                var z = a();
                z.open(e, h, !0);
                m(n, function(a, b) { A(a) && z.setRequestHeader(b, a) });
                z.onload = function() { var a = z.statusText || "",
                        b = "response" in z ? z.response : z.responseText,
                        c = 1223 === z.status ? 204 : z.status;
                    0 === c && (c = b ? 200 : "file" == Aa(h).protocol ? 404 : 0);
                    K(k, c, b, z.getAllResponseHeaders(), a) };
                e =
                    function() { K(k, -1, null, null, "") };
                z.onerror = e;
                z.onabort = e;
                r && (z.withCredentials = !0);
                if (t) try { z.responseType = t } catch (N) { if ("json" !== t) throw N; } z.send(v(l) ? null : l)
            }
            if (0 < p) var s = c(E, p);
            else p && x(p.then) && p.then(E)
        }
    }
})(window, document);
!window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');