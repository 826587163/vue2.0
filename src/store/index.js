import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import seller from './modules/seller.js'
import goods from './modules/goods.js'
import ratings from './modules/ratings.js'

Vue.use(Vuex);

export default new Vuex.Store({
	getters,
	actions,
	modules:{
		seller,
		goods,
		ratings
	}
});