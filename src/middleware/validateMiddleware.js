function formatZodErrors(error) {
  return error.issues.reduce((errors, issue) => {
    const [, ...fieldPath] = issue.path;
    const field = fieldPath.join(".") || issue.path.join(".") || "request";

    return {
      ...errors,
      [field]: issue.message,
    };
  }, {});
}

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: formatZodErrors(result.error),
      });
    }

    if (result.data.body) {
      req.body = result.data.body;
    }

    if (result.data.params) {
      req.params = result.data.params;
    }

    if (result.data.query) {
      req.query = result.data.query;
    }

    next();
  };
}

module.exports = { formatZodErrors, validate };
