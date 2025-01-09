import Vue from "vue";
import VueRouter from "vue-router";
import { routers } from './routers'

const originalPush = VueRouter.prototype.push
// The push of routing will add a record to the history stack and redirect to the same routing page, which will cause a duplicate addition and result in page errors. Rewrite the push method
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace ditto
VueRouter.prototype.replace = function replace (to) {
  return originalPush.call(this, to).catch(err => err)
}

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routers
});

export default router;
