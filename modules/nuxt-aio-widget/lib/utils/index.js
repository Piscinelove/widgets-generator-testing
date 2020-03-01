import path from 'upath'
import fsExtra from 'fs-extra'
import { paramCase, pascalCase } from 'change-case'

export const MODULE_NAME = 'nuxt-custom-elements'

const BUILD_DIR = 'dist'
const ENTRIES_DIR = 'entries'
const DEFAULT_PARALLEL_BUILDS = 1

export function getEntriesDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.buildDir, MODULE_NAME, ENTRIES_DIR))
}
export function getBuildDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.buildDir, MODULE_NAME, BUILD_DIR))
}
export function getDistDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.generate.dir, MODULE_NAME))
}

export function getDefaultOptions (options) {
  return Object.assign({
    name: MODULE_NAME,
    analyzer: false,
    polyfill: false,
    parallelBuilds: DEFAULT_PARALLEL_BUILDS,
    publicPath: '/',
    staticPath: null,
    entries: [],
    shadow: false
  }, options)
}

/**
 * Prepare entry and its tags.
 * @param {Object} entry Endpoint-Entry
 * @param {Object} options Module-Options
 */
function prepareEntry (entry, options) {
  const tags = entry.tags.map((tag) => {
    const tagOptions = Object.assign({ shadow: Boolean(options.shadow) }, tag.options)
    return Object.assign(tag, {
      name: paramCase(tag.name),
      options: tagOptions,
      async: tag.async || false
    })
  })
  return Object.assign(entry, {
    name: paramCase(entry.name),
    tags
  })
}

/**
 * Create prepared entry list.
 * @param {Object} nuxt Nuxt
 * @param {Object} options Module-Options
 */
export function generateEntries (nuxt, options) {
  return options.entries.map((entry) => {
    entry = prepareEntry(entry, options)
    return {
      name: entry.name,
      template: {
        src: path.resolve(__dirname, '../tmpl', 'entry.js'),
        options: {
          tags: entry.tags,
          polyfill: options.polyfill
        },
        fileName: path.resolve(getEntriesDir(nuxt), `${entry.name}.js`)
      }
    }
  })
}

export async function initDist (nuxt, options) {
  const buildDir = getBuildDir(nuxt)
  const entries = getEntriesDir(nuxt)
  const distPath = getDistDir(nuxt)

  // Clean destination folder
  await fsExtra.remove(distPath)

  /*
  if ('staticPath' in options && await fsExtra.exists(options.staticPath)) {
    let copy = await fsExtra.copy(entries, options.staticPath);
  }*/

  if ('staticPath' in options && await fsExtra.exists(options.staticPath)) {
    //await fsExtra.copy(entries, options.staticPath);
    await fsExtra.remove(options.staticPath)
    await fsExtra.copy(buildDir, options.staticPath, {
      /*
      filter: n => {
            if (fsExtra.lstatSync(n).isDirectory()) {
              return true;
          }
          console.log(n);
          console.log(n.indexOf('latest') > -1);
          return n.indexOf('latest') > -1 ? true : false;
      }*/
    })
  }
}

export function getEntryNamingMap (options) {
  return options.entries.reduce((result, { name }) => {
    result[String(pascalCase(name))] = paramCase(name)
    result[String(paramCase(name))] = paramCase(name)
    return result
  }, {})
}
