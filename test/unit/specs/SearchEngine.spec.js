import Vue from 'vue'
import SearchEngine from '@/components/SearchEngine'

describe('SearchEngine.vue', () => {

  it('should render correct contents', () => {
    const Constructor = Vue.extend(SearchEngine)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#search-text').placeholder)
      .toEqual('Input your message, and search on Kok-Kip')
  })

})
