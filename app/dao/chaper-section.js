const {
  ChapterSection
} = require('../models/chaper-section.js')
class ChapterSectionDao {
  static async create(body) {
    const hasChapter = await ChapterSection.findOne({
      where: {
        title: body.title,
        deleted_at: null
      }
    })
    if (hasChapter) {
      throw new global.errs.Existing('专栏文章已经存在')
    }
    const chaperSection = new ChapterSection()
    chaperSection.title = body.title
    chaperSection.author = body.author
    chaperSection.content = body.content
    chaperSection.column_chapter_id = body.column_chapter_id
    chaperSection.save()
  }
  static async detail(id) {
    const chapterSection = await ChapterSection.findOne({
      where: {
        id,
        deleted_at: null
      },
    })
    if (!chapterSection) {
      throw new global.errs.NotFound('没有找到相关专栏文章')
    }
    return chapterSection
  }

  static async list(id) {
    return await ChapterSection.findAll({
      where: {
        column_chapter_id: id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ]
    })
  }


}

module.exports = {
  ChaperSectionDao
}