function limitGenerator(limitInMinutes, maxRequests) {
  return {
    windowMs: limitInMinutes * 60 * 1000,
    max: maxRequests,
    message: `Too many requests, please try again later after ${limitInMinutes} minutes`,
  };
}

module.exports = limitGenerator;
