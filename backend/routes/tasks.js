const router = require('express').Router();
const { format } = require('date-fns');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.DATABASE_ID;

const getDateString = (date) => {
  return format(date, 'yyyy-MM-dd');
}

const getTaskData = (result) => {
  return {
    id: result["id"],
    date: result["properties"]["Date"]["date"]["start"],
    done: result["properties"]["Done"]["checkbox"],
    title: result["properties"]["Task"]["title"][0]["plain_text"]
  }
}

router.get('', async (req, res) => {
  const {date, start, end} = req.query;
  const filter = date ? {
    property: "Date",
    date: {
      "equals": date
    }
  } : {
    and :[{
      property: "Date",
      date: {
        "after": start,
      }
    }, {
      property: "Date",
      date: {
        "before": end,
      }
    }]
  };
  try {
    const {results} = await notion.databases.query({ 
      database_id: DATABASE_ID,
      filter
    });
    const data = results.map(result => getTaskData(result));
    res.json(data);
  } catch(error) {
    res.status(error.status).json(error.body);
  }
});

router.post('', async (req, res) => {
  const {title} = req.body;
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID
      },
      properties: {
        Task: {
          title: [
            {
              text: {
                content: title
              }
            }
          ]
        },
        Done: {
          checkbox: false
        },
        Date: {
          date: {
            start: getDateString(new Date())
          }
        }
      }
    })
    const data = getTaskData(response);
    res.json(data);
  } catch(error) {
    res.status(error.status).json(error.body);
  }
});

router.put('/:task_id', async (req, res) => {
  const {title, done} = req.body;
  try {
    const {results} = await notion.pages.update({
      page_id: req.params.task_id,
      properties: {
        Task: {
          title: [
            {
              text: {
                content: title
              }
            }
          ]
        },
        Done: {
          checkbox: done
        }
      }
    })
    res.status(200).json({message: 'success'});
  } catch(error) {
    res.status(error.status).json(error.body);
  }
});

// router.delete();

module.exports = router;